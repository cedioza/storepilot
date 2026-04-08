"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Package, 
  BarChart3, 
  FileText, 
  Settings,
  Bot
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Chat / Agentes", href: "/chat", icon: MessageSquare },
  { name: "Inventario", href: "/inventory", icon: Package },
  { name: "Analíticas", href: "/analytics", icon: BarChart3 },
  { name: "Documentos", href: "/documents", icon: FileText },
  { name: "Configuración", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

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

      <div className="p-4 border-t border-[#27272A]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
            JD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">John Doe</span>
            <span className="text-xs text-zinc-400">CEO / Founder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
