"use client";

import { useUser } from "@/lib/UserContext";
import { Package, Search, Plus, AlertTriangle, ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = ["Todos", "Ropa", "Calzado", "Accesorios", "Electrónica", "Computación", "Periféricos", "Audio", "Almacenamiento", "Componentes"];

export default function InventoryPage() {
  const { currentUser, inventorySummary } = useUser();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts = currentUser.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || 
                         product.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatus = (stock: number) => {
    if (stock === 0) return { label: "Agotado", color: "red" };
    if (stock < 10) return { label: "Bajo", color: "amber" };
    return { label: "OK", color: "emerald" };
  };

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">Inventario</h1>
          <p className="text-zinc-400 mt-1">{currentUser.name} — {currentUser.products.length} productos</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="h-4 w-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4 mb-8">
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Total Productos</p>
            <Package className="h-5 w-5 text-zinc-400" />
          </div>
          <p className="text-3xl font-semibold text-white mt-2">{currentUser.products.length}</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Stock Bajo</p>
            <AlertTriangle className="h-5 w-5 text-amber-500" />
          </div>
          <p className="text-3xl font-semibold text-amber-500 mt-2">{inventorySummary.lowStockCount}</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Agotados</p>
            <AlertTriangle className="h-5 w-5 text-red-500" />
          </div>
          <p className="text-3xl font-semibold text-red-500 mt-2">{inventorySummary.outOfStockCount}</p>
        </div>
        <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-400">Valor Inventario</p>
            <Package className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-3xl font-semibold text-emerald-500 mt-2">${(inventorySummary.totalValue / 1000).toFixed(1)}k</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#27272A] border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="flex items-center gap-2 bg-[#27272A] rounded-lg p-1 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === cat ? 'bg-emerald-500 text-white' : 'text-zinc-400 hover:text-white'
              }`}
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
            {filteredProducts.map((product) => {
              const status = getStatus(product.stock);
              return (
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
                    <span className={`text-sm font-medium ${
                      product.stock === 0 ? 'text-red-500' : product.stock < 10 ? 'text-amber-500' : 'text-white'
                    }`}>
                      {product.stock === 0 ? 'Agotado' : product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      status.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' :
                      status.color === 'amber' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <ChevronDown className="h-4 w-4 text-zinc-400" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">
            <Package className="h-12 w-12 text-zinc-600 mx-auto mb-4" />
            <p className="text-zinc-400">No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  );
}
