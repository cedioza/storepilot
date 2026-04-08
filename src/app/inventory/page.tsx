import { Package, Search, Plus, AlertTriangle, ChevronDown } from "lucide-react";

const products = [
  { id: "1", name: "Sneakers Limitados Vol 1", sku: "SNK-V1-001", price: 2500, stock: 3, category: "Calzado", status: "low" },
  { id: "2", name: "Jacket de Cuero Vegano", sku: "JKT-CVO-002", price: 1800, stock: 12, category: "Ropa", status: "ok" },
  { id: "3", name: "Pantalón Cargo Negro", sku: "PNT-CRG-003", price: 890, stock: 45, category: "Ropa", status: "ok" },
  { id: "4", name: "Camiseta Básica Blanca", sku: "CMT-BSC-004", price: 250, stock: 67, category: "Ropa", status: "ok" },
  { id: "5", name: "Gorra Beisbol Logo", sku: "GRP-BSL-005", price: 300, stock: 23, category: "Accesorios", status: "ok" },
  { id: "6", name: "Laptop Pro 16\"", sku: "LAP-PRO-006", price: 45000, stock: 0, category: "Electrónica", status: "out" },
  { id: "7", name: "Monitor 4K Curved", sku: "MON-4KC-007", price: 12000, stock: 8, category: "Electrónica", status: "low" },
  { id: "8", name: "Teclado Mecánico", sku: "TEC-MEC-008", price: 2500, stock: 2, category: "Electrónica", status: "low" },
];

const categories = ["Todos", "Ropa", "Calzado", "Accesorios", "Electrónica"];

export default function InventoryPage() {
  const lowStockCount = products.filter(p => p.stock > 0 && p.stock < 10).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">Inventario</h1>
          <p className="text-zinc-400 mt-1">Gestiona tus productos y stock</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-8">
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Total Productos</p>
            <Package className="h-5 w-5 text-zinc-400" />
          </div>
          <p className="text-3xl font-semibold text-white mt-2">{products.length}</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Stock Bajo</p>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-semibold text-amber-500 mt-2">{lowStockCount}</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Agotados</p>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-3xl font-semibold text-red-500 mt-2">{outOfStockCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar producto..."
            className="w-full bg-[#27272A] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="flex items-center gap-2 bg-[#27272A] rounded-lg p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${cat === 'Todos' ? 'bg-emerald-500 text-white' : 'text-zinc-400 hover:text-white'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-xl bg-[#27272A] border border-white/5 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-zinc-400 bg-[#1f1f22]">
              <th className="px-6 py-4 font-medium">Producto</th>
              <th className="px-6 py-4 font-medium">SKU</th>
              <th className="px-6 py-4 font-medium">Categoría</th>
              <th className="px-6 py-4 font-medium text-right">Precio</th>
              <th className="px-6 py-4 font-medium text-center">Stock</th>
              <th className="px-6 py-4 font-medium text-center">Estado</th>
              <th className="px-6 py-4 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-white/5 hover:bg-[#1f1f22]/50 transition-colors">
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-white">{product.name}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-400 font-mono">{product.sku}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-zinc-400">{product.category}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-medium text-white">${product.price.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-500' : product.stock < 10 ? 'text-amber-500' : 'text-white'}`}>
                    {product.stock === 0 ? 'Agotado' : product.stock}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  {product.status === 'ok' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                      OK
                    </span>
                  )}
                  {product.status === 'low' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400">
                      Bajo
                    </span>
                  )}
                  {product.status === 'out' && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                      Agotado
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
