"use client";

import { useState } from "react";
import { User, Bell, CreditCard, Key, Globe, Palette, Check } from "lucide-react";

const plans = [
  { id: "FREE", name: "Free", price: "$0", features: ["50 productos", "1 agente", "Reportes básicos"] },
  { id: "PRO", name: "Pro", price: "$15/mes", features: ["500 productos", "3 agentes", "Reportes avanzados", "Soporte prioritario"], popular: true },
  { id: "ENTERPRISE", name: "Enterprise", price: "$40/mes", features: ["Productos ilimitados", "6 agentes", "API access", "Manager dedicado"] },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    stock: true,
    sales: false,
    marketing: false,
  });

  const tabs = [
    { id: "profile", name: "Perfil", icon: User },
    { id: "notifications", name: "Notificaciones", icon: Bell },
    { id: "billing", name: "Facturación", icon: CreditCard },
    { id: "api", name: "API Keys", icon: Key },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-['Space_Grotesk'] tracking-tight">Configuración</h1>
        <p className="text-zinc-400 mt-1">Administra tu cuenta y preferencias</p>
      </div>

      <div className="flex gap-8">
        {/* Tabs */}
        <div className="w-64 shrink-0">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-emerald-500 text-white"
                    : "text-zinc-400 hover:bg-[#27272A] hover:text-white"
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
                <h3 className="text-lg font-semibold mb-4">Información del Perfil</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Nombre</label>
                    <input
                      type="text"
                      defaultValue="Urban Streetwear (PRO)"
                      className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="pro@storepilot.com"
                      className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">Tienda</label>
                    <input
                      type="text"
                      defaultValue="Urban Streetwear MX"
                      className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-2">País</label>
                    <select className="w-full bg-[#18181B] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-emerald-500/50">
                      <option>México</option>
                      <option>Colombia</option>
                      <option>Argentina</option>
                      <option>España</option>
                    </select>
                  </div>
                </div>
                <button className="mt-6 px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Guardar Cambios
                </button>
              </div>

              {/* Plan Actual */}
              <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
                <h3 className="text-lg font-semibold mb-4">Tu Plan Actual</h3>
                <div className="flex items-center justify-between p-4 bg-[#18181B] rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-white">PRO</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">Activo</span>
                    </div>
                    <p className="text-sm text-zinc-400 mt-1">$15/mes • Renovación: 15 Feb 2026</p>
                  </div>
                  <button className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                    Cambiar Plan
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
              <h3 className="text-lg font-semibold mb-4">Preferencias de Notificaciones</h3>
              <div className="space-y-4">
                {[
                  { key: "email", label: "Resumen por email semanal", desc: "Recibe un resumen de tu actividad cada semana" },
                  { key: "stock", label: "Alertas de stock bajo", desc: "Notificar cuando un producto tenga menos de 10 unidades" },
                  { key: "sales", label: "Notificaciones de ventas", desc: "Alerta en tiempo real cuando hagas una venta" },
                  { key: "marketing", label: "Tips de marketing", desc: "Consejos semanales para mejorar tu e-commerce" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 bg-[#18181B] rounded-lg">
                    <div>
                      <p className="font-medium text-white">{item.label}</p>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications] ? "bg-emerald-500" : "bg-zinc-600"
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          notifications[item.key as keyof typeof notifications] ? "translate-x-7" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "billing" && (
            <div className="space-y-6">
              <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
                <h3 className="text-lg font-semibold mb-4">Método de Pago</h3>
                <div className="flex items-center gap-4 p-4 bg-[#18181B] rounded-lg">
                  <div className="h-12 w-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white font-bold text-xs">
                    VISA
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-white">•••• •••• •••• 4242</p>
                    <p className="text-sm text-zinc-400">Expira 12/27</p>
                  </div>
                  <button className="text-sm text-zinc-400 hover:text-white transition-colors">Editar</button>
                </div>
                <button className="mt-4 px-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                  + Agregar Método de Pago
                </button>
              </div>

              <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
                <h3 className="text-lg font-semibold mb-4">Historial de Facturación</h3>
                <div className="space-y-3">
                  {[
                    { date: "15 Ene 2026", amount: "$15.00", status: "Pagado" },
                    { date: "15 Dic 2025", amount: "$15.00", status: "Pagado" },
                    { date: "15 Nov 2025", amount: "$15.00", status: "Pagado" },
                  ].map((invoice) => (
                    <div key={invoice.date} className="flex items-center justify-between p-3 bg-[#18181B] rounded-lg">
                      <span className="text-sm text-zinc-400">{invoice.date}</span>
                      <span className="text-sm font-medium text-white">{invoice.amount}</span>
                      <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">
                        {invoice.status}
                      </span>
                      <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">Descargar</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "api" && (
            <div className="rounded-xl bg-[#27272A] p-6 border border-white/5">
              <h3 className="text-lg font-semibold mb-4">API Keys</h3>
              <p className="text-sm text-zinc-400 mb-4">
                Usa estas keys para integrar StorePilot con otras aplicaciones.
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-[#18181B] rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">API Key</span>
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-emerald-500/10 text-emerald-400">Activa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm font-mono text-zinc-400 bg-[#27272A] px-3 py-2 rounded">
                      sk_live_••••••••••••••••
                    </code>
                    <button className="px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm transition-colors">
                      Copiar
                    </button>
                  </div>
                </div>
                <button className="px-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors">
                  + Generar Nueva Key
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
