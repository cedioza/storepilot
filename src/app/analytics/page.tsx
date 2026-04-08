"use client";

import { useUser } from "@/lib/UserContext";
import { DollarSign, TrendingUp, Package, ShoppingCart, AlertTriangle, ArrowUpRight } from "lucide-react";

export default function AnalyticsPage() {
  const { currentUser, inventorySummary } = useUser();

  // Generar datos de ventas simulados basados en el rol
  const salesMultiplier = currentUser.role === "ENTERPRISE" ? 10 : currentUser.role === "PRO" ? 3 : 1;
  
  const metrics = [
    { 
      name: "Ventas del Mes", 
      value: `$${(currentUser.stats.totalSales * 0.35).toLocaleString()}`, 
      change: "+23%", 
      positive: true, 
      icon: DollarSign 
    },
    { 
      name: "Órdenes", 
      value: (342 * salesMultiplier).toString(), 
      change: "+18%", 
      positive: true, 
      icon: ShoppingCart 
    },
    { 
      name: "Ticket Promedio", 
      value: `$${(134 * salesMultiplier).toLocaleString()}`, 
      change: "+5%", 
      positive: true, 
      icon: TrendingUp 
    },
    { 
      name: "Productos Vendidos", 
      value: (1247 * salesMultiplier).toString(), 
      change: "+31%", 
      positive: true, 
      icon: Package 
    },
  ];

  const topProducts = currentUser.products
    .filter(p => p.stock > 0)
    .slice(0, 5)
    .map((p, i) => ({
      name: p.name,
      sales: Math.floor(Math.random() * 50 * salesMultiplier) + 10,
      revenue: `$${(p.price * Math.floor(Math.random() * 30 + 5) * salesMultiplier).toLocaleString()}`,
      stock: p.stock
    }));

  const lowStock = currentUser.products
    .filter(p => p.stock > 0 && p.stock < 10)
    .slice(0, 3)
    .map(p => ({ name: p.name, stock: p.stock, threshold: 10 }));

  const outOfStock = currentUser.products
    .filter(p => p.stock === 0)
    .slice(0, 3)
    .map(p => ({ name: p.name, stock: 0, threshold: 5 }));

  const salesData = [
    { day: "Lun", sales: 12 * salesMultiplier },
    { day: "Mar", sales: 19 * salesMultiplier },
    { day: "Mié", sales: 15 * salesMultiplier },
    { day: "Jue", sales: 28 * salesMultiplier },
    { day: "Vie", sales: 35 * salesMultiplier },
    { day: "Sáb", sales: 42 * salesMultiplier },
    { day: "Dom", sales: 38 * salesMultiplier },
  ];

  const maxSales = Math.max(...salesData.map(d => d.sales));

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">Analíticas</h1>
          <p className="text-zinc-400 mt-1">{currentUser.name} — Enero 2026</p>
        </div>
        <select className="bg-[#27272A] text-white border border-white/10 rounded-lg px-4 py-2 text-sm outline-none">
          <option>Enero 2026</option>
          <option>Diciembre 2025</option>
          <option>Noviembre 2025</option>
        </select>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {metrics.map((metric) => (
          <div key={metric.name} className="rounded-xl bg-[#27272A] p-6 border border-white/5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-zinc-400">{metric.name}</p>
              <metric.icon className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <p className="text-3xl font-semibold tracking-tight text-white">{metric.value}</p>
              <span className="text-sm font-medium flex items-center text-emerald-500">
                <ArrowUpRight className="h-4 w-4" />
                {metric.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 rounded-xl bg-[#27272A] p-6 border border-white/5">
          <h3 className="text-lg font-semibold mb-4">Ventas por Día</h3>
          <div className="flex items-end justify-between h-48 gap-2">
            {salesData.map((item) => (
              <div key={item.day} className="flex flex-col items-center gap-2 flex-1">
                <div 
                  className="w-full bg-emerald-500/20 rounded-t-md hover:bg-emerald-500/30 transition-colors relative group"
                  style={{ height: `${(item.sales / maxSales) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#18181B] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {item.sales} ventas
                  </div>
                </div>
                <span className="text-xs text-zinc-500">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-semibold">Alertas de Stock</h3>
          </div>
          
          {outOfStock.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-red-400 font-medium mb-2">AGOTADOS</p>
              <div className="space-y-2">
                {outOfStock.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 bg-red-500/5 rounded-lg border border-red-500/10">
                    <span className="text-sm text-zinc-300 truncate">{item.name}</span>
                    <span className="text-sm font-bold text-red-500">AGOTADO</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {lowStock.length > 0 && (
            <div>
              <p className="text-xs text-amber-400 font-medium mb-2">STOCK BAJO</p>
              <div className="space-y-2">
                {lowStock.map((item) => (
                  <div key={item.name} className="flex items-center justify-between p-2 bg-amber-500/5 rounded-lg border border-amber-500/10">
                    <span className="text-sm text-zinc-300 truncate">{item.name}</span>
                    <span className="text-sm font-bold text-amber-500">{item.stock} uni.</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {outOfStock.length === 0 && lowStock.length === 0 && (
            <p className="text-sm text-emerald-400 text-center py-4">
              ✓ Todo tu inventario está en orden
            </p>
          )}

          <button className="w-full mt-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-colors">
            Ver Inventario Completo
          </button>
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
        <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
        {topProducts.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-zinc-400 border-b border-white/5">
                  <th className="pb-3 font-medium">Producto</th>
                  <th className="pb-3 font-medium text-right">Ventas</th>
                  <th className="pb-3 font-medium text-right">Ingresos</th>
                  <th className="pb-3 font-medium text-right">Stock</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, i) => (
                  <tr key={product.name} className="border-b border-white/5 last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-zinc-600">{i + 1}</span>
                        <span className="text-sm font-medium text-white">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right text-sm text-zinc-300">{product.sales}</td>
                    <td className="py-4 text-right text-sm font-medium text-emerald-400">{product.revenue}</td>
                    <td className="py-4 text-right">
                      <span className={`text-sm font-medium ${product.stock < 10 ? 'text-amber-500' : 'text-zinc-400'}`}>
                        {product.stock}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-zinc-400 py-8">No hay datos de ventas disponibles</p>
        )}
      </div>
    </div>
  );
}
