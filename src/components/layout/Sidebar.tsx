"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@/lib/UserContext";
import { Role } from "@/lib/userData";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Package, 
  BarChart3, 
  FileText, 
  Settings,
  Bot,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Chat / Agentes", href: "/chat", icon: MessageSquare },
  { name: "Inventario", href: "/inventory", icon: Package },
  { name: "Analíticas", href: "/analytics", icon: BarChart3 },
  { name: "Documentos", href: "/documents", icon: FileText },
  { name: "Configuración", href: "/settings", icon: Settings },
];

const roles: { id: Role; name: string; color: string }[] = [
  { id: "FREE", name: "Tienda Local", color: "bg-zinc-500" },
  { id: "PRO", name: "Boutique", color: "bg-emerald-500" },
  { id: "ENTERPRISE", name: "Multi-Tienda", color: "bg-indigo-500" },
];

export function Sidebar() {
  const pathname = usePathname();
  const { currentUser, selectedRole, setSelectedRole } = useUser();
  const [showRoleSwitcher, setShowRoleSwitcher] = useState(false);

  const currentRoleInfo = roles.find(r => r.id === selectedRole);

  return (
    <div className="flex h-screen w-64 flex-col bg-[#18181B] border-r border-[#27272A]">
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
          <Bot className="h-5 w-5 text-white" />
        </div>
        <span className="text-xl font-bold tracking-tight text-white font-['Space_Grotesk']">
          StorePilot
        </span>
      </div>

      <nav className="flex-1 space-y-1 px-4 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-zinc-400 hover:bg-[#27272A] hover:text-white"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0",
                  isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User / Role Switcher */}
      <div className="p-4 border-t border-[#27272A]">
        {/* Role Switcher Button */}
        <button
          onClick={() => setShowRoleSwitcher(!showRoleSwitcher)}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#27272A] transition-colors"
        >
          <div className={cn("h-8 w-8 rounded-full flex items-center justify-center text-white text-sm font-bold", currentRoleInfo?.color)}>
            {selectedRole === "FREE" ? "F" : selectedRole === "PRO" ? "P" : "E"}
          </div>
          <div className="flex-1 text-left">
            <span className="text-sm font-medium text-white block">{currentUser.name}</span>
            <span className="text-xs text-zinc-400">{currentUser.plan}</span>
          </div>
          <ChevronDown className={cn("h-4 w-4 text-zinc-400 transition-transform", showRoleSwitcher && "rotate-180")} />
        </button>

        {/* Role Switcher Dropdown */}
        {showRoleSwitcher && (
          <div className="mt-2 p-2 bg-[#27272A] rounded-lg border border-white/5">
            <p className="text-xs text-zinc-500 px-2 py-1 mb-1">Cambiar cuenta demo:</p>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => {
                  setSelectedRole(role.id);
                  setShowRoleSwitcher(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2 px-2 py-2 rounded-md text-sm transition-colors",
                  selectedRole === role.id 
                    ? "bg-emerald-500/20 text-emerald-400" 
                    : "text-zinc-400 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className={cn("h-6 w-6 rounded-full flex items-center justify-center text-white text-xs font-bold", role.color)}>
                  {role.id === "FREE" ? "F" : role.id === "PRO" ? "P" : "E"}
                </div>
                <span>{role.name}</span>
                {selectedRole === role.id && (
                  <span className="ml-auto text-xs text-emerald-400">✓</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* User Stats */}
        <div className="mt-3 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-[#1f1f22] rounded-lg">
            <p className="text-lg font-bold text-white">{currentUser.stats.totalProducts}</p>
            <p className="text-xs text-zinc-500">Productos</p>
          </div>
          <div className="p-2 bg-[#1f1f22] rounded-lg">
            <p className="text-lg font-bold text-emerald-400">${(currentUser.stats.totalSales / 1000).toFixed(1)}k</p>
            <p className="text-xs text-zinc-500">Ventas</p>
          </div>
          <div className="p-2 bg-[#1f1f22] rounded-lg">
            <p className={cn("text-lg font-bold", currentUser.stats.lowStock > 0 ? "text-amber-400" : "text-zinc-400")}>
              {currentUser.stats.lowStock + currentUser.stats.outOfStock}
            </p>
            <p className="text-xs text-zinc-500">Alertas</p>
          </div>
        </div>
      </div>
    </div>
  );
}
