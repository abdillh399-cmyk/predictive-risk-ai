/**
 * ARIST - AI Risk Assessment Page
 * Design: Professional Enterprise Dark Dashboard
 * Features: Interactive risk matrix, AI analysis, risk scoring
 */

import Layout from "@/components/Layout";
import { Brain, Cpu, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const riskCategories = [
  { id: "fire", name: "مخاطر الحريق", level: "H", score: 85, trend: "up" },
  { id: "chemical", name: "مخاطر كيميائية", level: "M", score: 62, trend: "stable" },
  { id: "electrical", name: "مخاطر كهربائية", level: "H", score: 78, trend: "down" },
  { id: "mechanical", name: "مخاطر ميكانيكية", level: "M", score: 55, trend: "stable" },
  { id: "ergonomic", name: "مخاطر بيئة العمل", level: "L", score: 30, trend: "down" },
  { id: "environmental", name: "مخاطر بيئية", level: "L", score: 25, trend: "stable" },
];

// 5x5 Risk Matrix
const matrixData = [
  ["M", "M", "H", "H", "H"],
  ["L", "M", "M", "H", "H"],
  ["L", "M", "M", "M", "H"],
  ["L", "L", "M", "M", "M"],
  ["L", "L", "L", "M", "M"],
];

const likelihoodLabels = ["شبه مؤكد (5)", "محتمل (4)", "ممكن (3)", "غير محتمل (2)", "نادر (1)"];
const impactLabels = ["ضئيل (1)", "طفيف (2)", "متوسط (3)", "كبير (4)", "كارثي (5)"];

function MatrixCell({ level, highlighted }: { level: string; highlighted?: boolean }) {
  const base =
    level === "H"
      ? "risk-cell-high"
      : level === "M"
      ? "risk-cell-medium"
      : "risk-cell-low";
  return (
    <div
      className={`${base} aspect-square flex items-center justify-center text-xs font-bold rounded transition-all duration-200 ${
        highlighted ? "scale-110 z-10 relative" : ""
      }`}
    >
      {level}
    </div>
  );
}

export default function RiskAssessment() {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      toast.success("اكتمل التحليل الذكي للمخاطر بنجاح");
    }, 2500);
  };

  return (
    <Layout>
      <div className="p-4 lg:p-6 fade-in">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{
              background: "oklch(0.55 0.2 240 / 0.15)",
              border: "1px solid oklch(0.55 0.2 240 / 0.4)",
            }}
          >
            <Brain size={20} style={{ color: "oklch(0.7 0.15 220)" }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: "oklch(0.92 0.01 220)" }}>
              تقييم المخاطر الذكي
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
              تحليل شامل للمخاطر باستخدام الذكاء الاصطناعي
            </p>
          </div>
          <div className="mr-auto">
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              style={{
                background: analyzing
                  ? "oklch(0.55 0.2 240 / 0.1)"
                  : "oklch(0.55 0.2 240 / 0.2)",
                border: "1px solid oklch(0.55 0.2 240 / 0.5)",
                color: "oklch(0.7 0.15 220)",
              }}
            >
              <Cpu size={14} className={analyzing ? "animate-spin" : ""} />
              {analyzing ? "جاري التحليل..." : "تشغيل التحليل الذكي"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Matrix */}
          <div className="arist-card overflow-hidden">
            <div className="section-header">
              <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 220)" }}>
                مصفوفة تقييم المخاطر
              </span>
              <span className="text-xs" style={{ color: "oklch(0.55 0.2 240)" }}>
                الاحتمالية × التأثير
              </span>
            </div>
            <div className="p-4">
              {/* Y-axis label */}
              <div className="flex gap-2">
                <div className="flex flex-col justify-around w-24 shrink-0">
                  {likelihoodLabels.map((label, idx) => (
                    <div
                      key={idx}
                      className="text-xs text-left"
                      style={{ color: "oklch(0.5 0.02 240)" }}
                    >
                      {label}
                    </div>
                  ))}
                </div>
                <div className="flex-1">
                  <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
                    {matrixData.map((row, rowIdx) =>
                      row.map((cell, colIdx) => (
                        <MatrixCell key={`${rowIdx}-${colIdx}`} level={cell} />
                      ))
                    )}
                  </div>
                  {/* X-axis labels */}
                  <div className="grid mt-2" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
                    {impactLabels.map((label, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-center"
                        style={{ color: "oklch(0.5 0.02 240)", fontSize: "0.6rem" }}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex gap-4 mt-4 justify-center">
                {[
                  { level: "H", label: "عالي", cls: "risk-cell-high" },
                  { level: "M", label: "متوسط", cls: "risk-cell-medium" },
                  { level: "L", label: "منخفض", cls: "risk-cell-low" },
                ].map((item) => (
                  <div key={item.level} className="flex items-center gap-1.5">
                    <div className={`${item.cls} w-5 h-5 rounded flex items-center justify-center text-xs font-bold`}>
                      {item.level}
                    </div>
                    <span className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Categories */}
          <div className="arist-card overflow-hidden">
            <div className="section-header">
              <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 220)" }}>
                تصنيفات المخاطر
              </span>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {riskCategories.map((cat) => (
                <div
                  key={cat.id}
                  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200"
                  style={{
                    background:
                      selectedCategory === cat.id
                        ? "oklch(0.55 0.2 240 / 0.1)"
                        : "oklch(0.16 0.018 240)",
                    border: `1px solid ${
                      selectedCategory === cat.id
                        ? "oklch(0.55 0.2 240 / 0.4)"
                        : "oklch(0.22 0.02 240)"
                    }`,
                  }}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                  }
                >
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center text-xs font-bold shrink-0 ${
                      cat.level === "H"
                        ? "risk-cell-high"
                        : cat.level === "M"
                        ? "risk-cell-medium"
                        : "risk-cell-low"
                    }`}
                  >
                    {cat.level}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium" style={{ color: "oklch(0.85 0.01 220)" }}>
                        {cat.name}
                      </span>
                      <span
                        className="text-xs font-mono"
                        style={{
                          color:
                            cat.score >= 70
                              ? "oklch(0.6 0.22 25)"
                              : cat.score >= 40
                              ? "oklch(0.65 0.18 80)"
                              : "oklch(0.65 0.18 145)",
                        }}
                      >
                        {cat.score}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "oklch(0.22 0.02 240)" }}
                    >
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${cat.score}%`,
                          background:
                            cat.score >= 70
                              ? "oklch(0.6 0.22 25)"
                              : cat.score >= 40
                              ? "oklch(0.65 0.18 80)"
                              : "oklch(0.65 0.18 145)",
                        }}
                      />
                    </div>
                  </div>
                  <TrendingUp
                    size={14}
                    style={{
                      color:
                        cat.trend === "up"
                          ? "oklch(0.6 0.22 25)"
                          : cat.trend === "down"
                          ? "oklch(0.65 0.18 145)"
                          : "oklch(0.6 0.02 240)",
                      transform: cat.trend === "down" ? "scaleY(-1)" : "none",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="arist-card overflow-hidden lg:col-span-2">
            <div className="section-header">
              <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 220)" }}>
                توصيات الذكاء الاصطناعي
              </span>
              <div className="ai-badge flex items-center gap-1">
                <Cpu size={10} />
                <span>AI Analysis</span>
              </div>
            </div>
            <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: AlertTriangle,
                  color: "oklch(0.6 0.22 25)",
                  bg: "oklch(0.6 0.22 25 / 0.1)",
                  border: "oklch(0.6 0.22 25 / 0.3)",
                  title: "إجراء فوري مطلوب",
                  desc: "مخاطر الحريق والكهرباء تتطلب معالجة عاجلة في المنطقة الشمالية من المنشأة",
                },
                {
                  icon: TrendingUp,
                  color: "oklch(0.65 0.18 80)",
                  bg: "oklch(0.65 0.18 80 / 0.1)",
                  border: "oklch(0.65 0.18 80 / 0.3)",
                  title: "مراقبة مستمرة",
                  desc: "المخاطر الكيميائية والميكانيكية في مستوى متوسط وتحتاج إلى متابعة دورية",
                },
                {
                  icon: CheckCircle,
                  color: "oklch(0.65 0.18 145)",
                  bg: "oklch(0.65 0.18 145 / 0.1)",
                  border: "oklch(0.65 0.18 145 / 0.3)",
                  title: "مستوى مقبول",
                  desc: "مخاطر بيئة العمل والمخاطر البيئية ضمن الحدود المقبولة وفق معايير السلامة",
                },
              ].map((rec, idx) => {
                const Icon = rec.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-lg"
                    style={{
                      background: rec.bg,
                      border: `1px solid ${rec.border}`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon size={16} style={{ color: rec.color }} />
                      <span className="text-sm font-semibold" style={{ color: rec.color }}>
                        {rec.title}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: "oklch(0.7 0.02 240)" }}>
                      {rec.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
