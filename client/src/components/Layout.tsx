/**
 * تنبؤ المخاطر الذكي Dashboard Layout
 * Design: Professional Enterprise Dark Dashboard
 * Colors: Dark navy background, blue primary, green for AI status
 * Layout: Fixed sidebar (right) + main content area
 */

import { useState } from "react";
import { useLocation } from "wouter";
import {
  FileText,
  Brain,
  Settings,
  Shield,
  FolderOpen,
  Cpu,
  Menu,
  X,
  MapPin,
} from "lucide-react";

const navItems = [
  {
    id: "reports",
    label: "إنشاء التقارير المتعلقة بالمنشأة",
    icon: FileText,
    path: "/reports",
  },
  {
    id: "risk-assessment",
    label: "تقييم المخاطر الذكي",
    icon: Brain,
    path: "/risk-assessment",
  },
  {
    id: "add-risk",
    label: "إضافة وتعديل المخاطر",
    icon: Settings,
    path: "/add-risk",
  },
  {
    id: "safety-check",
    label: "التحقق من معايير السلامة",
    icon: Shield,
    path: "/safety-check",
  },
  {
    id: "previous-reports",
    label: "التقارير السابقة",
    icon: FolderOpen,
    path: "/previous-reports",
  },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, navigate] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentTime = new Date().toLocaleString("ar-SA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <div className="min-h-screen bg-background flex flex-col" dir="rtl">
      {/* Top Header Bar */}
      <header className="h-12 border-b border-border flex items-center justify-between px-4 shrink-0"
        style={{ background: "oklch(0.1 0.015 240)" }}>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded flex items-center justify-center"
              style={{ background: "oklch(0.55 0.2 240 / 0.2)", border: "1px solid oklch(0.55 0.2 240 / 0.4)" }}>
              <Cpu size={14} style={{ color: "oklch(0.7 0.15 220)" }} />
            </div>
            <span className="text-xs font-mono" style={{ color: "oklch(0.6 0.02 240)" }}>AI</span>
          </div>
          <span className="text-sm font-bold" style={{ color: "oklch(0.85 0.01 220)" }}>
            تنبؤ المخاطر الذكي - Predictive Risk AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
            <MapPin size={12} />
            <span>Dammam, KSA :موقع العمل</span>
          </div>
          <button
            className="md:hidden p-1.5 rounded"
            style={{ color: "oklch(0.7 0.15 220)" }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            w-72 shrink-0 flex flex-col border-l border-border overflow-y-auto
            transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "md:translate-x-0 translate-x-full"}
            fixed md:static top-12 md:top-0 right-0 h-[calc(100vh-3rem)] md:h-auto z-40
          `}
          style={{ background: "oklch(0.11 0.016 240)" }}
        >
          {/* Sidebar Header */}
          <div className="section-header">
            <span className="text-sm font-bold" style={{ color: "oklch(0.85 0.01 220)" }}>
              لوحة التحكم الرئيسية
            </span>
          </div>

          {/* Nav Items */}
          <nav className="p-3 flex flex-col gap-2 flex-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.path || (location === "/" && item.id === "reports");
              return (
                <button
                  key={item.id}
                  className={`predictive-risk-nav-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                >
                  <span className="text-sm font-medium flex-1">{item.label}</span>
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center shrink-0"
                    style={{
                      background: isActive
                        ? "oklch(0.55 0.2 240 / 0.2)"
                        : "oklch(0.18 0.02 240)",
                      border: `1px solid ${isActive ? "oklch(0.55 0.2 240 / 0.5)" : "oklch(0.25 0.02 240)"}`,
                    }}
                  >
                    <Icon
                      size={16}
                      style={{
                        color: isActive ? "oklch(0.7 0.15 220)" : "oklch(0.6 0.02 240)",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 border-t border-border">
            <p className="text-xs text-center" style={{ color: "oklch(0.45 0.02 240)" }}>
              نظام تنبؤ المخاطر الذكي مدعوم بالذكاء الاصطناعي لأرامكو السعودية
            </p>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 md:hidden"
            style={{ background: "oklch(0 0 0 / 0.5)" }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
