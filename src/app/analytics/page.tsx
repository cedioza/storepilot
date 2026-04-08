import { DollarSign, TrendingUp, Package, ShoppingCart, AlertTriangle, ArrowUpRight, ArrowDownRight } from "lucide-react";

const metrics = [
  { name: "Ventas del Mes", value: "$45,890", change: "+23%", positive: true, icon: DollarSign },
  { name: "Órdenes", value: "342", change: "+18%", positive: true, icon: ShoppingCart },
  { name: "Ticket Promedio", value: "$134", change: "+5%", positive: true, icon: TrendingUp },
  { name: "Productos Vendidos", value: "1,247", change: "+31%", positive: true, icon: Package },
];

const topProducts = [
  { name: "Sneakers Limitados Vol 1", sales: 45, revenue: "$112,500", stock: 3 },
  { name: "Jacket de Cuero Vegano", sales: 32, revenue: "$57,600", stock: 12 },
  { name: "Pantalón Cargo Negro", sales: 28, revenue: "$24,920", stock: 45 },
  { name: "Camiseta Básica Blanca", sales: 24, revenue: "$6,000", stock: 67 },
  { name: "Gorra Beisbol Logo", sales: 19, revenue: "$5,700", stock: 23 },
];

const lowStock = [
  { name: "Sneakers Limitados Vol 1", stock: 3, threshold: 10 },
  { name: "Laptop Pro 16\"", stock: 0, threshold: 5 },
  { name: "Teclado Mecánico", stock: 2, threshold: 15 },
];

const salesData = [
  { day: "Lun", sales: 12 },
  { day: "Mar", sales: 19 },
  { day: "Mié", sales: 15 },
  { day: "Jue", sales: 28 },
  { day: "Vie", sales: 35 },
  { day: "Sáb", sales: 42 },
  { day: "Dom", sales: 38 },
];

export default function AnalyticsPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">Analíticas</h1>
          <p className="text-zinc-400 mt-1">Resumen de rendimiento de tu negocio</p>
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
              <span className={`text-sm font-medium flex items-center ${metric.positive ? 'text-emerald-500' : 'text-red-500'}`}>
                {metric.positive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
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
                  style={{ height: `${(item.sales / 50) * 100}%` }}
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

        {/* Low Stock Alert */}
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h3 className="text-lg font-semibold">Stock Bajo</h3>
          </div>
          <div className="space-y-3">
            {lowStock.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-[#18181B] rounded-lg">
                <div>
                  <p className="text-sm font-medium text-white">{item.name}</p>
                  <p className="text-xs text-zinc-500">Mín: {item.threshold}</p>
                </div>
                <span className={`text-sm font-bold ${item.stock === 0 ? 'text-red-500' : 'text-amber-500'}`}>
                  {item.stock === 0 ? 'AGOTADO' : item.stock}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 bg-amber-500/10 text-amber-500 rounded-lg text-sm font-medium hover:bg-amber-500/20 transition-colors">
            Ver Inventario
          </button>
        </div>
      </div>

      {/* Top Products */}
      <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
        <h3 className="text-lg font-semibold mb-4">Productos Más Vendidos</h3>
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
                  <td className="py-4 text-right text-sm font-medium text-emerald-400">${product.revenue}</td>
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
      </div>
    </div>
  );
}
