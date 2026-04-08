# 🚀 StorePilot — Tu Equipo de Asistentes IA

> **El problema:** Los pequeños dueños de e-commerce en Latinoamérica pierden horas interminables haciendo trabajo manual: subir productos, actualizar inventario, responder clientes, analizar reportes. No tienen tiempo para hacer crecer su negocio.
>
> **La solución:** StorePilot es tu equipo de asistentes de IA que trabajan 24/7. Tú subes un documento — una factura, un reporte de ventas, una foto de producto — y el equipo de agentes hace el trabajo pesado. Tú solo validas y approves.

---

## 🎯 ¿Qué resuelve?

| Problema Real | Cómo lo resolvemos |
|--------------|-------------------|
| "Subir 200 productos me toma 6 horas" | Subes un Excel → La IA genera todo el contenido |
| "No tengo tiempo de responder reseñas" | El Agente de Atención responde por ti |
| "No sé cuánto stock tengo" | Subes la factura → Inventario actualizado |
| "Mis descripciones son genéricas" | El Agente de Marketing crea copy profesional |
| "No sé cómo van mis ventas" | Pides un resumen → Análisis instantáneo |

---

## 🧠 El Modelo Agéntico

StorePilot NO es un chatbot. Es un **equipo de agentes especializados** que trabajan para ti:

```
📋 DOCUMENTO SUBIDO
        │
        ▼
┌───────────────────┐
│   ORQUESTADOR      │
│  "Clasifica la     │
│   tarea y delega"  │
└────────┬──────────┘
         │
    ┌────┴────┬────────────┐
    ▼         ▼            ▼
┌───────┐ ┌────────┐ ┌──────────┐
│MARKETING│ │INVENTORY│ │ANALYTICS│
│ Agent  │ │ Agent  │ │  Agent   │
└───┬───┘ └───┬────┘ └────┬────┘
    │         │            │
    └─────────┼────────────┘
              ▼
     ┌────────────────┐
     │   RESULTADOS   │
     │  Para tu       │
     │  aprobación    │
     └────────────────┘
              │
              ▼
        ✅ APROBADO
```

**Tú eres el CEO. Tu equipo IA ejecuta. Tú validas.**

---

## 👥 Tres Roles, Tres Experiencias

Demostramos que el modelo de negocio escala:

| Plan | Perfil | Productos | Agentes | Funcionalidades |
|------|--------|-----------|---------|-----------------|
| **FREE** | Tienda local, 1-2 personas | Hasta 50 | 1 | Subir facturas, inventario básico |
| **PRO** | Boutique establecida | Hasta 500 | 3 | Marketing + Inventory + Analytics |
| **ENTERPRISE** | Multi-tienda, catálogos grandes | Ilimitados | 6 | Todos los agentes + reportes avanzados |

---

## 🏗️ Stack Tecnológico

| Capa | Tecnología | Por qué |
|------|-----------|---------|
| **Frontend** | Next.js 16 + React 19 | App router, Server Components, TurboPack |
| **Styling** | Tailwind CSS 4 | Design system minimalista, oscuro, profesional |
| **Backend** | Next.js API Routes | Serverless, desplegable en cualquier lado |
| **Base de Datos** | SQLite + Prisma ORM | Cero configuración, persistente en archivo |
| **IA** | OpenAI GPT-4o / GPT-4o-mini | Visión, JSON estructurado, prompts agénticos |
| **Despliegue** | Docker + Dockploy | reproducible, escala, zero-config |
| ** íconos** | Lucide React | Minimalistas, profesionales |

---

## 📁 Estructura del Proyecto

```
storepilot/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Dashboard principal
│   │   ├── chat/page.tsx         # Interfaz del chat agéntico
│   │   └── api/chat/route.ts     # Orquestador + agentes
│   └── components/
│       └── layout/Sidebar.tsx    # Navegación lateral
├── prisma/
│   ├── schema.prisma             # Modelo de datos
│   ├── seed.ts                   # 3 usuarios de prueba
│   └── data/dev.db               # SQLite (volumen persistente)
├── Dockerfile                    # Imagen multi-stage optimizada
└── docker-compose.yml            # Para Dockploy
```

---

## ⚡ Ejecutar Localmente

```bash
# 1. Clonar y entrar
git clone https://github.com/cedioza/storepilot.git
cd storepilot

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y añadir: DATABASE_URL="file:./data/dev.db"
# Añadir tu OPENAI_API_KEY (opcional para modo demo)

# 4. Crear base de datos y seed
npm run db:push
npm run db:seed

# 5. Levantar en desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

---

## 🐳 Desplegar en Dockploy

1. Conecta tu repositorio de GitHub (`cedioza/storepilot`)
2. Añade la variable de entorno: `OPENAI_API_KEY=tu-key-aqui`
3. Deploy — Dockploy usa automáticamente el `docker-compose.yml`

**Puerto interno:** `3000` (expuesto, Dockploy enruta el tráfico)

---

## 🏆 Criterios de Hackathon

### 1. MVP Funcional (35%)

✅ **Funciona desde el primer segundo.** El chat responde instantáneamente con respuestas mock si no hay API key, y con IA real si la tienes.

✅ **No requiere integraciones externas.** Sube facturas, reportes, fotos — StorePilot los procesa.

✅ **Desplegado y accesible.** Ya está corriendo en Dockploy.

### 2. Creatividad e Innovación (20%)

✅ **Paradigma "Equipo Agéntico".** No es "le pregunto a ChatGPT". Es "delego a mi equipo y solo aprobo".

✅ **Validación humana primero.** La IA propone, el humano decide. Esto lo hace seguro para uso real.

✅ **Escalabilidad de roles.** El modelo SaaS está integrado desde el día 1.

### 3. Impacto (25%)

✅ **Problema universal.** El 90% de los e-commerce en LATAM son operados por 1-2 personas.

✅ **Ahorro de tiempo medible.** El dueño deja de gastar 10+ horas semanales en trabajo manual.

✅ **Escalabilidad.** El mismo sistema sirve para moda, electronics, groceries, etc.

### 4. Modelo de Negocio (20%)

✅ **SaaS por tiers.** Free → Pro ($15/mes) → Enterprise ($40/mes).

✅ **Evidencia de mercado.** Los 3 roles están en la base de datos y funcionando.

✅ **Time-to-market.** Se puede cobrar desde el día 1.

---

## 🎬 Demo Script (Para la Presentación)

```
1. "Soy dueño de una boutique. Acabo de recibir mercancía."
   → Subo PDF de factura

2. "StorePilot detecta 18 productos. Propone sumarlos al inventario."
   → Muestro la tarjeta con "Aprobar Todo"

3. "Además, quiero crear las descripciones para publicarlos."
   → Subo las fotos de los productos

4. "El Agente de Marketing me genera título SEO, descripción y tags."
   → Muestro el contenido generado

5. "StorePilot hizo en 20 segundos lo que me toma 3 horas."
   → Click en "Aprobar Todo"

6. "Este es mi equipo. Yo valido, ellos trabajan."
```

---

## 📡 API Endpoints

### `POST /api/chat`

Envía un mensaje de texto al orquestador.

**Request:**
```json
{
  "message": "Subí mi factura de febrero",
  "role": "PRO"
}
```

**Response:**
```json
{
  "agent": "INVENTORY",
  "reply": "He procesado la factura. 18 productos detectados.",
  "structured_data": {
    "items_detected": [
      { "product_name": "Camisa Azul M", "quantity": 20, "suggested_action": "ADD_STOCK" }
    ]
  }
}
```

---

## 🔑 Variables de Entorno

| Variable | Descripción | Requerido |
|----------|-------------|-----------|
| `DATABASE_URL` | Path al archivo SQLite | Sí (default incluido) |
| `OPENAI_API_KEY` | API key de OpenAI | No (funciona en modo mock) |

---

## 📄 Licencia

MIT — Libre para usar, modificar y desplegar.

---

**StorePilot: Tu equipo de IA trabaja 24/7 para que tú puedas.focus en crecer tu negocio.**
