/**
 * ARIST - Safety Standards Check Page
 * Design: Professional Enterprise Dark Dashboard
 * Features: Safety checklist, compliance status, standards verification
 */

import Layout from "@/components/Layout";
import { Shield, CheckCircle, XCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SafetyItem {
  id: number;
  standard: string;
  description: string;
  category: string;
  status: "pass" | "fail" | "warning" | "pending";
  lastChecked: string;
}

const safetyItems: SafetyItem[] = [
  { id: 1, standard: "NFPA 101", description: "معايير سلامة الحياة من الحرائق", category: "الحريق", status: "pass", lastChecked: "2024-07-23" },
  { id: 2, standard: "OSHA 1910.119", description: "إدارة سلامة العمليات", category: "العمليات", status: "warning", lastChecked: "2024-07-20" },
  { id: 3, standard: "ISO 45001", description: "نظام إدارة الصحة والسلامة المهنية", category: "الإدارة", status: "pass", lastChecked: "2024-07-23" },
  { id: 4, standard: "NFPA 70E", description: "معايير السلامة الكهربائية", category: "الكهرباء", status: "fail", lastChecked: "2024-07-15" },
  { id: 5, standard: "ANSI Z87.1", description: "معايير حماية العين والوجه", category: "معدات الحماية", status: "pass", lastChecked: "2024-07-23" },
  { id: 6, standard: "API RP 500", description: "تصنيف المناطق الكهربائية", category: "الكهرباء", status: "warning", lastChecked: "2024-07-18" },
  { id: 7, standard: "NFPA 30", description: "قانون السوائل القابلة للاشتعال", category: "الكيمياء", status: "pass", lastChecked: "2024-07-23" },
  { id: 8, standard: "29 CFR 1910.146", description: "الدخول إلى الأماكن المحصورة", category: "العمليات", status: "fail", lastChecked: "2024-07-10" },
];

const statusConfig = {
  pass: { icon: CheckCircle, color: "oklch(0.65 0.18 145)", bg: "oklch(0.65 0.18 145 / 0.1)", border: "oklch(0.65 0.18 145 / 0.3)", label: "مطابق" },
  fail: { icon: XCircle, color: "oklch(0.6 0.22 25)", bg: "oklch(0.6 0.22 25 / 0.1)", border: "oklch(0.6 0.22 25 / 0.3)", label: "غير مطابق" },
  warning: { icon: AlertCircle, color: "oklch(0.65 0.18 80)", bg: "oklch(0.65 0.18 80 / 0.1)", border: "oklch(0.65 0.18 80 / 0.3)", label: "تحذير" },
  pending: { icon: RefreshCw, color: "oklch(0.55 0.2 240)", bg: "oklch(0.55 0.2 240 / 0.1)", border: "oklch(0.55 0.2 240 / 0.3)", label: "قيد الفحص" },
};

export default function SafetyCheck() {
  const [items, setItems] = useState<SafetyItem[]>(safetyItems);
  const [checking, setChecking] = useState(false);
  const [filter, setFilter] = useState<string>("all");

  const handleRunCheck = () => {
    setChecking(true);
    setItems(items.map((item) => ({ ...item, status: "pending" as const })));
    setTimeout(() => {
      setItems(safetyItems);
      setChecking(false);
      toast.success("اكتمل فحص معايير السلامة");
    }, 3000);
  };

  const passCount = items.filter((i) => i.status === "pass").length;
  const failCount = items.filter((i) => i.status === "fail").length;
  const warnCount = items.filter((i) => i.status === "warning").length;
  const complianceRate = Math.round((passCount / items.length) * 100);

  const filtered = filter === "all" ? items : items.filter((i) => i.status === filter);

  return (
    <Layout>
      <div className="p-4 lg:p-6 fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(0.55 0.2 240 / 0.15)",
              border: "1px solid oklch(0.55 0.2 240 / 0.4)",
            }}
          >
            <Shield size={20} style={{ color: "oklch(0.7 0.15 220)" }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: "oklch(0.92 0.01 220)" }}>
              التحقق من معايير السلامة
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
              فحص مطابقة المعايير الدولية والمحلية
            </p>
          </div>
          <button
            onClick={handleRunCheck}
            disabled={checking}
            className="mr-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
            style={{
              background: "oklch(0.55 0.2 240 / 0.2)",
              border: "1px solid oklch(0.55 0.2 240 / 0.5)",
              color: "oklch(0.7 0.15 220)",
            }}
          >
            <RefreshCw size={14} className={checking ? "animate-spin" : ""} />
            {checking ? "جاري الفحص..." : "تشغيل الفحص"}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { label: "نسبة المطابقة", value: `${complianceRate}%`, color: "oklch(0.65 0.18 145)" },
            { label: "مطابق", value: passCount, color: "oklch(0.65 0.18 145)" },
            { label: "تحذير", value: warnCount, color: "oklch(0.65 0.18 80)" },
            { label: "غير مطابق", value: failCount, color: "oklch(0.6 0.22 25)" },
          ].map((stat, idx) => (
            <div key={idx} className="arist-card p-4">
              <div className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Compliance Progress */}
        <div className="arist-card p-4 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 220)" }}>
              مستوى المطابقة الإجمالي
            </span>
            <span className="text-sm font-bold" style={{ color: "oklch(0.65 0.18 145)" }}>
              {complianceRate}%
            </span>
          </div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "oklch(0.22 0.02 240)" }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${complianceRate}%`,
                background: `linear-gradient(90deg, oklch(0.65 0.18 145), oklch(0.55 0.2 240))`,
              }}
            />
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {[
            { value: "all", label: "الكل" },
            { value: "pass", label: "مطابق" },
            { value: "warning", label: "تحذير" },
            { value: "fail", label: "غير مطابق" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className="px-3 py-1.5 rounded text-xs font-medium transition-all"
              style={{
                background: filter === f.value ? "oklch(0.55 0.2 240 / 0.2)" : "oklch(0.16 0.018 240)",
                border: `1px solid ${filter === f.value ? "oklch(0.55 0.2 240 / 0.5)" : "oklch(0.25 0.02 240)"}`,
                color: filter === f.value ? "oklch(0.7 0.15 220)" : "oklch(0.6 0.02 240)",
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Safety Items List */}
        <div className="flex flex-col gap-3">
          {filtered.map((item) => {
            const cfg = statusConfig[item.status];
            const Icon = cfg.icon;
            return (
              <div
                key={item.id}
                className="arist-card p-4 flex items-start gap-4"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: cfg.bg, border: `1px solid ${cfg.border}` }}
                >
                  <Icon size={18} style={{ color: cfg.color }} className={item.status === "pending" ? "animate-spin" : ""} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-sm font-mono" style={{ color: "oklch(0.85 0.01 220)" }}>
                      {item.standard}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-xs font-medium"
                      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: cfg.color }}
                    >
                      {cfg.label}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-xs"
                      style={{ background: "oklch(0.18 0.02 240)", color: "oklch(0.55 0.2 240)" }}
                    >
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: "oklch(0.65 0.02 240)" }}>
                    {item.description}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "oklch(0.45 0.02 240)" }}>
                    آخر فحص: {item.lastChecked}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
