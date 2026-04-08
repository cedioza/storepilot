import { Package, DollarSign, AlertCircle, ShoppingCart, Upload, Sparkles, FileText } from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Productos", value: "245", icon: Package, change: "+12", changeType: "positive" },
  { name: "Ventas (Mes)", value: "$12,450", icon: DollarSign, change: "+23%", changeType: "positive" },
  { name: "Acciones Pendientes", value: "3", icon: AlertCircle, change: "Requiere atención", changeType: "warning", color: "text-amber-500" },
  { name: "Stock Bajo", value: "5", icon: ShoppingCart, change: "Reorden sugerido", changeType: "negative", color: "text-red-500" },
];

export default function Dashboard() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">Dashboard</h1>
          <p className="text-zinc-400 mt-1">Bienvenido de nuevo. Tu equipo de IA está listo.</p>
        </div>
        <div className="text-sm text-zinc-400 bg-[#27272A] px-4 py-2 rounded-lg">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="rounded-xl bg-[#27272A] p-6 shadow-sm border border-white/5 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-400">{stat.name}</p>
              <stat.icon className={`h-5 w-5 ${stat.color || "text-zinc-400"}`} />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <p className="text-3xl font-semibold tracking-tight text-white">{stat.value}</p>
              <span className={`text-sm font-medium ${
                stat.changeType === 'positive' ? 'text-emerald-500' :
                stat.changeType === 'negative' ? 'text-red-500' : 'text-amber-500'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold font-['Space_Grotesk'] mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/chat?action=upload" className="group p-6 rounded-xl bg-[#27272A] border border-white/5 hover:bg-[#2A2A2E] transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3">
          <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
            <Upload className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h3 className="font-medium text-white">Subir Factura</h3>
            <p className="text-sm text-zinc-400 mt-1">Actualiza inventario</p>
          </div>
        </Link>
        
        <Link href="/chat?action=marketing" className="group p-6 rounded-xl bg-[#27272A] border border-white/5 hover:bg-[#2A2A2E] transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3">
          <div className="h-12 w-12 rounded-full bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
            <Sparkles className="h-6 w-6 text-indigo-500" />
          </div>
          <div>
            <h3 className="font-medium text-white">Generar Copy</h3>
            <p className="text-sm text-zinc-400 mt-1">Crea descripciones</p>
          </div>
        </Link>

        <Link href="/inventory" className="group p-6 rounded-xl bg-[#27272A] border border-white/5 hover:bg-[#2A2A2E] transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3">
          <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
            <Package className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h3 className="font-medium text-white">Revisar Stock</h3>
            <p className="text-sm text-zinc-400 mt-1">Alertas pendientes</p>
          </div>
        </Link>

        <Link href="/analytics" className="group p-6 rounded-xl bg-[#27272A] border border-white/5 hover:bg-[#2A2A2E] transition-all cursor-pointer flex flex-col items-center justify-center text-center gap-3">
          <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
            <FileText className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-medium text-white">Ver Reportes</h3>
            <p className="text-sm text-zinc-400 mt-1">Análisis de ventas</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
