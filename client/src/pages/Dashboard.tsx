/**
 * تنبؤ المخاطر الذكي Dashboard - Main Control Panel
 * Design: Professional Enterprise Dark Dashboard
 * Colors: Dark navy (#0d1117), Blue primary, Green AI status
 * Layout: Two-panel - status right, content left (RTL)
 */

import Layout from "@/components/Layout";
import { Cpu, CheckCircle, Clock, TrendingUp, AlertTriangle, Brain } from "lucide-react";
import { useLocation } from "wouter";

// Risk matrix - 5x5 (احتمالية × تأثير)
const riskMatrix = [
  ["M", "M", "H", "H", "H"],
  ["L", "M", "M", "H", "H"],
  ["L", "M", "M", "M", "H"],
  ["L", "L", "M", "M", "M"],
  ["L", "L", "L", "M", "M"],
];

const recentReports = [
  { date: "2024-04-23", time: "13:37:08:39" },
  { date: "2024-04-23", time: "13:37:35:03" },
  { date: "2024-07-23", time: "13:37:38:03" },
  { date: "2024-07-23", time: "13:39:05:33" },
];

function RiskCell({ level }: { level: string }) {
  const cls =
    level === "H" ? "risk-cell-high" : level === "M" ? "risk-cell-medium" : "risk-cell-low";
  return (
    <div className={`${cls} w-full aspect-square flex items-center justify-center text-xs font-bold rounded-sm cursor-pointer hover:opacity-80 transition-opacity`}>
      {level}
    </div>
  );
}

export default function Dashboard() {
  const [, navigate] = useLocation();

  const quickActions = [
    { label: "إنشاء التقارير المتعلقة بالمنشأة", path: "/reports", icon: "📋", color: "oklch(0.55 0.2 240)" },
    { label: "تقييم المخاطر الذكي", path: "/risk-assessment", icon: "🧠", color: "oklch(0.55 0.2 240)" },
    { label: "إضافة وتعديل المخاطر", path: "/add-risk", icon: "⚙️", color: "oklch(0.55 0.2 240)" },
    { label: "التحقق من معايير السلامة", path: "/safety-check", icon: "🛡️", color: "oklch(0.55 0.2 240)" },
    { label: "التقارير السابقة", path: "/previous-reports", icon: "📁", color: "oklch(0.55 0.2 240)" },
  ];

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row h-full fade-in min-h-0">

        {/* Right Status Panel (matches original image right panel) */}
        <div
          className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-border flex flex-col overflow-y-auto"
          style={{ background: "oklch(0.115 0.016 240)" }}
        >
          <div className="section-header">
            <span className="text-sm font-bold" style={{ color: "oklch(0.85 0.01 220)" }}>
              تفاصيل حالة النظام
            </span>
          </div>

          <div className="p-4 flex flex-col gap-5">
            {/* AI Status */}
            <div
              className="rounded-xl p-4 flex flex-col items-center gap-2 text-center"
              style={{
                background: "oklch(0.65 0.18 145 / 0.08)",
                border: "1px solid oklch(0.65 0.18 145 / 0.25)",
              }}
            >
              <div className="flex items-center gap-2">
                <div className="status-dot" />
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: "oklch(0.65 0.18 145 / 0.15)",
                    border: "2px solid oklch(0.65 0.18 145 / 0.4)",
                  }}
                >
                  <Cpu size={18} style={{ color: "oklch(0.75 0.18 145)" }} />
                </div>
              </div>
              <span className="text-base font-bold glow-text-green">AI Enabled</span>
              <span className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
                النظام يعمل وكفاءة عالية
              </span>
            </div>

            {/* Risk Matrix Summary */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "oklch(0.65 0.02 240)" }}>
                ملخص مخاطر الموقع الحالي
              </p>
              {/* Header row */}
              <div className="flex gap-0.5 mb-0.5">
                <div className="w-10" />
                {["H", "H", "H", "H", "H"].map((l, i) => (
                  <div key={i} className="flex-1 text-center text-xs font-bold" style={{ color: "oklch(0.6 0.22 25)" }}>{l}</div>
                ))}
              </div>
              <div className="flex gap-0.5 mb-1">
                <div className="w-10 text-xs text-left" style={{ color: "oklch(0.45 0.02 240)", fontSize: "0.6rem" }}>Imp=H</div>
                {["H", "H", "H", "H", "H"].map((l, i) => (
                  <div key={i} className="flex-1 text-center text-xs font-bold" style={{ color: "oklch(0.6 0.22 25)" }}>{l}</div>
                ))}
              </div>
              {/* Matrix rows */}
              {riskMatrix.map((row, rowIdx) => (
                <div key={rowIdx} className="flex gap-0.5 mb-0.5">
                  <div className="w-10 flex items-center text-xs" style={{ color: "oklch(0.45 0.02 240)", fontSize: "0.65rem" }}>
                    {rowIdx === 0 ? "H" : rowIdx === 2 ? "H" : ""}
                  </div>
                  {row.map((cell, colIdx) => (
                    <div key={colIdx} className="flex-1">
                      <RiskCell level={cell} />
                    </div>
                  ))}
                </div>
              ))}
              {/* Bottom row */}
              <div className="flex gap-0.5 mt-0.5">
                <div className="w-10" />
                {["I", "L", "L", "L", "L"].map((l, i) => (
                  <div key={i} className="flex-1 text-center text-xs" style={{ color: "oklch(0.45 0.02 240)" }}>{l}</div>
                ))}
              </div>
            </div>

            {/* Recent Reports */}
            <div>
              <p className="text-xs font-semibold mb-2" style={{ color: "oklch(0.65 0.02 240)" }}>
                آخر التقارير التي تم الدخول إليها
              </p>
              <div className="flex flex-col gap-1">
                {recentReports.map((r, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs"
                    style={{
                      background: "oklch(0.155 0.018 240)",
                      border: "1px solid oklch(0.22 0.02 240)",
                    }}
                  >
                    <Clock size={10} style={{ color: "oklch(0.55 0.2 240)", flexShrink: 0 }} />
                    <span className="font-mono" style={{ color: "oklch(0.65 0.02 240)" }}>
                      {r.date}, {r.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Left Main Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Hero Banner */}
          <div
            className="relative overflow-hidden"
            style={{
              backgroundImage: "url(https://d2xsxph8kpxj0f.cloudfront.net/310519663600042681/9Wi2dnuiNZMhTk6s454NxT/predictive-risk-hero-bg-XavzviU8MxW5rHoRUGBV5M.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              minHeight: "180px",
            }}
          >
            <div className="absolute inset-0" style={{ background: "oklch(0.08 0.015 240 / 0.88)" }} />
            <div className="relative z-10 p-6">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "oklch(0.55 0.2 240 / 0.2)",
                    border: "1px solid oklch(0.55 0.2 240 / 0.5)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Cpu size={28} style={{ color: "oklch(0.7 0.15 220)" }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold" style={{ color: "oklch(0.95 0.01 220)" }}>
                    نظام تنبؤ المخاطر الذكي
                  </h1>
                  <p className="text-sm" style={{ color: "oklch(0.65 0.02 240)" }}>
                    Predictive Risk AI — Dammam, KSA
                  </p>
                </div>
                <div className="mr-auto ai-badge flex items-center gap-1.5">
                  <div className="status-dot" style={{ width: "6px", height: "6px" }} />
                  <span>AI Active</span>
                </div>
              </div>
              <p className="text-sm leading-relaxed max-w-xl" style={{ color: "oklch(0.72 0.01 220)" }}>
                مرحباً بك في لوحة التحكم الرئيسية. يمكنك الوصول إلى جميع أقسام النظام لتقييم وإدارة المخاطر بكفاءة عالية باستخدام الذكاء الاصطناعي.
              </p>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-5">
            {/* Stats Row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: "إجمالي المخاطر", value: "24", color: "oklch(0.55 0.2 240)", bg: "oklch(0.55 0.2 240 / 0.08)", border: "oklch(0.55 0.2 240 / 0.2)" },
                { label: "مخاطر عالية", value: "8", color: "oklch(0.6 0.22 25)", bg: "oklch(0.6 0.22 25 / 0.08)", border: "oklch(0.6 0.22 25 / 0.2)" },
                { label: "مخاطر متوسطة", value: "11", color: "oklch(0.65 0.18 80)", bg: "oklch(0.65 0.18 80 / 0.08)", border: "oklch(0.65 0.18 80 / 0.2)" },
                { label: "مخاطر منخفضة", value: "5", color: "oklch(0.65 0.18 145)", bg: "oklch(0.65 0.18 145 / 0.08)", border: "oklch(0.65 0.18 145 / 0.2)" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl"
                  style={{ background: stat.bg, border: `1px solid ${stat.border}` }}
                >
                  <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-sm font-semibold mb-3" style={{ color: "oklch(0.75 0.01 220)" }}>
                الوصول السريع
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <button
                    key={action.path}
                    onClick={() => navigate(action.path)}
                    className="predictive-risk-nav-btn text-right"
                    style={{ padding: "1rem 1.25rem" }}
                  >
                    <span className="text-sm font-medium flex-1">{action.label}</span>
                    <span className="text-xl shrink-0">{action.icon}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* System Health */}
            <div className="predictive-risk-card p-4">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle size={15} style={{ color: "oklch(0.65 0.18 145)" }} />
                <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 220)" }}>
                  حالة النظام
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: "محرك الذكاء الاصطناعي", status: "يعمل", ok: true, icon: Brain },
                  { label: "قاعدة بيانات المخاطر", status: "متصل", ok: true, icon: TrendingUp },
                  { label: "نظام التقارير", status: "جاهز", ok: true, icon: AlertTriangle },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg"
                      style={{
                        background: "oklch(0.155 0.018 240)",
                        border: "1px solid oklch(0.22 0.02 240)",
                      }}
                    >
                      <Icon size={14} style={{ color: item.ok ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 25)" }} />
                      <span className="text-xs flex-1" style={{ color: "oklch(0.7 0.02 240)" }}>
                        {item.label}
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{ color: item.ok ? "oklch(0.65 0.18 145)" : "oklch(0.6 0.22 25)" }}
                      >
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
