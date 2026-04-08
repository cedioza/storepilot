import { NextResponse } from "next/server";
import OpenAI from "openai";

// Inicializamos OpenAI. Si no hay key, usaremos un mock para la demo del hackathon
const openai = process.env.OPENAI_API_KEY 
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const ORCHESTRATOR_PROMPT = `
Eres el 'Orquestador' de StorePilot, un sistema de agentes IA para dueños de e-commerce.
Tu trabajo es analizar el input del usuario (texto o descripción de un archivo subido) y decidir qué agente especialista debe tomar la tarea.

Agentes disponibles:
1. "MARKETING": Si el usuario sube fotos de productos, pide crear descripciones, tags o posts.
2. "INVENTORY": Si el usuario sube facturas, albaranes, Excel de productos, o pregunta por stock.

Debes responder ÚNICAMENTE en formato JSON, sin texto adicional, con la siguiente estructura:
{
  "selected_agent": "MARKETING" | "INVENTORY" | "UNKNOWN",
  "reasoning": "Breve justificación de la decisión"
}
`;

const MARKETING_PROMPT = `
Eres el 'Marketing Agent' de StorePilot. Eres un experto en e-commerce y copywriting.
El usuario te ha dado un producto. Prepara el contenido necesario.
Responde ÚNICAMENTE en JSON válido con esta estructura:
{
  "product_title_seo": "Título optimizado",
  "description_html": "Descripción persuasiva en HTML básico",
  "suggested_tags": ["tag1", "tag2", "tag3"]
}
`;

const INVENTORY_PROMPT = `
Eres el 'Inventory Agent' de StorePilot. 
El usuario menciona documentos de inventario o facturas. Extrae los productos.
Responde ÚNICAMENTE en JSON válido con esta estructura:
{
  "items_detected": [
    { "product_name": "Nombre", "quantity": 10 }
  ]
}
`;

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // MODO MOCK: Si no hay API KEY de OpenAI configurada
    if (!openai) {
      console.warn("No OPENAI_API_KEY found. Using mock response.");
      
      // Simulación básica basada en palabras clave
      const isMarketing = message.toLowerCase().includes("foto") || message.toLowerCase().includes("descripción") || message.toLowerCase().includes("producto");
      
      if (isMarketing) {
        return NextResponse.json({
          agent: "MARKETING",
          reply: "¡Hola! He analizado tu producto. Aquí tienes el copy generado:",
          structured_data: {
            product_title_seo: "Camiseta de Algodón Premium",
            description_html: "<p>Esta es la camiseta perfecta para el verano. <b>Cómoda y fresca</b>.</p><ul><li>100% Algodón</li><li>Hecha a mano</li></ul>",
            suggested_tags: ["verano", "algodon", "moda"]
          }
        });
      } else {
        return NextResponse.json({
          agent: "INVENTORY",
          reply: "He detectado una factura/reporte. Aquí están los items a procesar:",
          structured_data: {
            items_detected: [
              { product_name: "Camisa Azul M", quantity: 20 },
              { product_name: "Pantalón Negro 32", quantity: 15 }
            ]
          }
        });
      }
    }

    // MODO REAL: Con OpenAI
    // 1. Orquestador decide
    const orchestratorResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: ORCHESTRATOR_PROMPT },
        { role: "user", content: message }
      ],
      temperature: 0.1,
    });

    const orchestration = JSON.parse(orchestratorResponse.choices[0].message.content || "{}");
    const agent = orchestration.selected_agent;

    // 2. Ejecutar Agente Específico
    let agentPrompt = "";
    if (agent === "MARKETING") agentPrompt = MARKETING_PROMPT;
    else if (agent === "INVENTORY") agentPrompt = INVENTORY_PROMPT;
    else {
      return NextResponse.json({
        agent: "ORCHESTRATOR",
        reply: "No estoy seguro de qué necesitas. ¿Puedes subir una factura, una foto de producto, o ser más específico?",
      });
    }

    const agentResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: agentPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.7,
    });

    const structuredData = JSON.parse(agentResponse.choices[0].message.content || "{}");

    return NextResponse.json({
      agent,
      reply: agent === "MARKETING" ? "Aquí tienes la información lista para publicar:" : "He procesado los datos. Revisa la lista:",
      structured_data: structuredData
    });

  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Error procesando la solicitud" }, { status: 500 });
  }
}
