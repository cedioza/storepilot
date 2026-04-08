"use client";

import { useState } from "react";
import { Paperclip, Send, Bot, Package, Sparkles } from "lucide-react";
import { useUser } from "@/lib/UserContext";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  agent?: "MARKETING" | "INVENTORY" | "ANALYTICS" | "ORCHESTRATOR";
  data?: any;
};

export default function ChatPage() {
  const { currentUser, inventorySummary, selectedRole } = useUser();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Hola, soy StorePilot. Tu equipo está listo para ${currentUser.name}. ¿En qué te ayudamos hoy?`,
      agent: "ORCHESTRATOR",
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Detectar si el mensaje es sobre inventario
  const isInventoryQuery = (text: string) => {
    const lower = text.toLowerCase();
    return lower.includes("inventario") || 
           lower.includes("stock") || 
           lower.includes("productos") ||
           lower.includes("qué tengo") ||
           lower.includes("que tengo") ||
           lower.includes("qué me falta") ||
           lower.includes("que me falta") ||
           lower.includes("agotado") ||
           lower.includes("bajo stock") ||
           lower.includes("resumen");
  };

  const generateInventoryResponse = () => {
    const { lowStockProducts, outOfStockProducts, ...summary } = inventorySummary;
    
    let response = `📊 **Resumen de Inventario para ${currentUser.name}:**\n\n`;
    response += `• **Total de productos:** ${summary.totalProducts}\n`;
    response += `• **Valor total:** $${(summary.totalValue / 1000).toFixed(1)}k\n`;
    response += `• **Stock bajo:** ${summary.lowStockCount}\n`;
    response += `• **Agotados:** ${summary.outOfStockCount}\n\n`;

    if (outOfStockProducts.length > 0) {
      response += `⚠️ **AGOTADOS (${outOfStockProducts.length}):**\n`;
      outOfStockProducts.forEach(p => {
        response += `• ${p.name}\n`;
      });
      response += `\n`;
    }

    if (lowStockProducts.length > 0) {
      response += `⚠️ **STOCK BAJO (${lowStockProducts.length}):**\n`;
      lowStockProducts.forEach(p => {
        response += `• ${p.name} — Solo ${p.stock} unidades\n`;
      });
    }

    return response;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Detectar si es una consulta de inventario
      if (isInventoryQuery(input)) {
        // Respuesta instantánea de inventario (mock inteligente)
        const inventoryResponse = generateInventoryResponse();
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: inventoryResponse,
          agent: "INVENTORY",
          data: inventorySummary
        }]);
      } else {
        // Llamada a la API para otros mensajes
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage.content, role: selectedRole })
        });
        
        const data = await response.json();
        
        if (data.error) {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.error
          }]);
        } else {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply || "He procesado tu solicitud.",
            agent: data.agent,
            data: data.structured_data
          }]);
        }
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Lo siento, hubo un error procesando tu solicitud."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const getAgentIcon = (agent?: string) => {
    switch (agent) {
      case "MARKETING": return <Sparkles className="h-4 w-4 text-indigo-400" />;
      case "INVENTORY": return <Package className="h-4 w-4 text-emerald-400" />;
      default: return <Bot className="h-4 w-4 text-zinc-400" />;
    }
  };

  const getAgentName = (agent?: string) => {
    switch (agent) {
      case "MARKETING": return "Marketing Agent";
      case "INVENTORY": return "Inventory Agent";
      case "ANALYTICS": return "Analytics Agent";
      default: return "StorePilot";
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Header */}
      <div className="h-16 border-b border-[#27272A] flex items-center px-8 bg-[#18181B]/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-xl font-bold font-['Space_Grotesk']">Chat con tu Equipo</h1>
        <div className="ml-6 flex items-center gap-3 text-xs font-medium text-zinc-400">
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-emerald-500"></div> 
            Online
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-emerald-400">{currentUser.name}</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 space-y-6">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center mr-3 mt-1 shrink-0 border border-white/5">
                {getAgentIcon(msg.agent)}
              </div>
            )}
            
            <div className="max-w-[70%]">
              {msg.role === "assistant" && (
                <div className="text-xs text-zinc-500 mb-1 ml-1">{getAgentName(msg.agent)}</div>
              )}
              
              <div className={`rounded-2xl p-4 ${
                msg.role === "user" 
                  ? "bg-emerald-500 text-white rounded-tr-sm" 
                  : "bg-[#27272A] text-zinc-200 rounded-tl-sm border border-white/5"
              }`}>
                {/* Renderizar texto con **bold** markdown simple */}
                <p className="whitespace-pre-wrap">{msg.content}</p>
                
                {/* Visualización de Datos Estructurados */}
                {msg.data && msg.agent === "MARKETING" && (
                  <div className="mt-4 p-4 bg-[#18181B] rounded-lg border border-white/5">
                    <h4 className="font-bold text-white mb-2">{msg.data.product_title_seo}</h4>
                    <div className="text-sm text-zinc-400 mb-4" dangerouslySetInnerHTML={{__html: msg.data.description_html}} />
                    <div className="flex flex-wrap gap-2">
                      {msg.data.suggested_tags?.map((tag: string) => (
                        <span key={tag} className="px-2 py-1 bg-indigo-500/10 text-indigo-400 text-xs rounded-md">#{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {msg.data && msg.agent === "INVENTORY" && !msg.data.product_title_seo && (
                  <div className="mt-4 p-4 bg-[#18181B] rounded-lg border border-white/5">
                    <h4 className="font-medium text-white mb-3">Acciones Detectadas</h4>
                    <div className="space-y-2">
                      {msg.data.items_detected?.map((item: any, i: number) => (
                        <div key={i} className="flex items-center justify-between text-sm p-2 rounded bg-[#27272A]">
                          <span className="text-zinc-300">{item.product_name}</span>
                          <span className="font-mono text-emerald-400">+{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors">
                      Aprobar Todo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center mr-3 mt-1 shrink-0">
              <Bot className="h-4 w-4 text-zinc-400 animate-pulse" />
            </div>
            <div className="bg-[#27272A] rounded-2xl rounded-tl-sm p-4 border border-white/5 flex items-center gap-2">
              <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="px-8 py-4 border-t border-[#27272A] bg-[#18181B]">
        <div className="flex items-center gap-2 text-xs text-zinc-500 mb-3">
          <span>Consultas rápidas:</span>
          <button 
            onClick={() => setInput("¿Qué tengo en inventario?")}
            className="px-2 py-1 bg-[#27272A] rounded hover:bg-[#323232] transition-colors"
          >
            Resumen inventario
          </button>
          <button 
            onClick={() => setInput("¿Qué productos tengo agotados?")}
            className="px-2 py-1 bg-[#27272A] rounded hover:bg-[#323232] transition-colors"
          >
            Agotados
          </button>
          <button 
            onClick={() => setInput("¿Qué tengo bajo stock?")}
            className="px-2 py-1 bg-[#27272A] rounded hover:bg-[#323232] transition-colors"
          >
            Stock bajo
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-[#18181B] border-t border-[#27272A]">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <button className="absolute left-4 text-zinc-400 hover:text-white transition-colors">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Escribe o arrastra un documento aquí..."
            className="w-full bg-[#27272A] border border-white/10 rounded-xl py-4 pl-12 pr-16 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="absolute right-3 p-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:hover:bg-emerald-500 text-white rounded-lg transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
