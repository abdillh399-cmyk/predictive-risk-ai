/**
 * تنبؤ المخاطر الذكي - Reports Generation Page
 * Design: Professional Enterprise Dark Dashboard
 * Features: Report creation, facility info, export options
 */

import Layout from "@/components/Layout";
import { FileText, Download, Printer, Send, Building, MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const reportTypes = [
  { id: "comprehensive", label: "تقرير شامل للمخاطر" },
  { id: "fire", label: "تقرير مخاطر الحريق" },
  { id: "chemical", label: "تقرير المخاطر الكيميائية" },
  { id: "electrical", label: "تقرير المخاطر الكهربائية" },
  { id: "safety", label: "تقرير معايير السلامة" },
  { id: "incident", label: "تقرير الحوادث" },
];

const facilities = [
  "المنشأة الرئيسية - الدمام",
  "منشأة الإنتاج - الجبيل",
  "مستودع المواد - الرياض",
  "محطة الضخ - ينبع",
];

export default function Reports() {
  const [form, setForm] = useState({
    reportType: reportTypes[0].id,
    facility: facilities[0],
    startDate: "2024-01-01",
    endDate: "2024-07-23",
    includeMatrix: true,
    includeRecommendations: true,
    includeStats: true,
    notes: "",
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success("تم إنشاء التقرير بنجاح");
    }, 2000);
  };

  const inputStyle = {
    background: "oklch(0.16 0.018 240)",
    border: "1px solid oklch(0.25 0.02 240)",
    color: "oklch(0.85 0.01 220)",
    borderRadius: "0.5rem",
    padding: "0.5rem 0.75rem",
    width: "100%",
    fontSize: "0.875rem",
    outline: "none",
  };

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
            <FileText size={20} style={{ color: "oklch(0.7 0.15 220)" }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: "oklch(0.92 0.01 220)" }}>
              إنشاء التقارير المتعلقة بالمنشأة
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
              توليد تقارير شاملة ومفصلة للمخاطر
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Report Form */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Report Type */}
            <div className="predictive-risk-card p-5">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "oklch(0.85 0.01 220)" }}>
                <FileText size={14} style={{ color: "oklch(0.55 0.2 240)" }} />
                نوع التقرير
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {reportTypes.map((rt) => (
                  <button
                    key={rt.id}
                    onClick={() => setForm({ ...form, reportType: rt.id })}
                    className="p-3 rounded-lg text-xs text-right transition-all"
                    style={{
                      background: form.reportType === rt.id ? "oklch(0.55 0.2 240 / 0.15)" : "oklch(0.16 0.018 240)",
                      border: `1px solid ${form.reportType === rt.id ? "oklch(0.55 0.2 240 / 0.5)" : "oklch(0.22 0.02 240)"}`,
                      color: form.reportType === rt.id ? "oklch(0.7 0.15 220)" : "oklch(0.7 0.02 240)",
                    }}
                  >
                    {rt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Facility & Date */}
            <div className="predictive-risk-card p-5">
              <h2 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: "oklch(0.85 0.01 220)" }}>
                <Building size={14} style={{ color: "oklch(0.55 0.2 240)" }} />
                معلومات المنشأة والفترة الزمنية
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs mb-1 block flex items-center gap-1" style={{ color: "oklch(0.6 0.02 240)" }}>
                    <MapPin size={10} /> المنشأة
                  </label>
                  <select style={inputStyle} value={form.facility} onChange={(e) => setForm({ ...form, facility: e.target.value })}>
                    {facilities.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div />
                <div>
                  <label className="text-xs mb-1 block flex items-center gap-1" style={{ color: "oklch(0.6 0.02 240)" }}>
                    <Calendar size={10} /> من تاريخ
                  </label>
                  <input type="date" style={inputStyle} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs mb-1 block flex items-center gap-1" style={{ color: "oklch(0.6 0.02 240)" }}>
                    <Calendar size={10} /> إلى تاريخ
                  </label>
                  <input type="date" style={inputStyle} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Report Options */}
            <div className="predictive-risk-card p-5">
              <h2 className="text-sm font-semibold mb-4" style={{ color: "oklch(0.85 0.01 220)" }}>
                محتويات التقرير
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { key: "includeMatrix", label: "تضمين مصفوفة المخاطر" },
                  { key: "includeRecommendations", label: "تضمين التوصيات" },
                  { key: "includeStats", label: "تضمين الإحصائيات" },
                ].map((opt) => (
                  <label key={opt.key} className="flex items-center gap-3 cursor-pointer">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center transition-all"
                      style={{
                        background: form[opt.key as keyof typeof form] ? "oklch(0.55 0.2 240 / 0.3)" : "oklch(0.16 0.018 240)",
                        border: `1px solid ${form[opt.key as keyof typeof form] ? "oklch(0.55 0.2 240 / 0.6)" : "oklch(0.25 0.02 240)"}`,
                      }}
                      onClick={() => setForm({ ...form, [opt.key]: !form[opt.key as keyof typeof form] })}
                    >
                      {form[opt.key as keyof typeof form] && (
                        <span style={{ color: "oklch(0.7 0.15 220)", fontSize: "0.7rem" }}>✓</span>
                      )}
                    </div>
                    <span className="text-sm" style={{ color: "oklch(0.75 0.01 220)" }}>{opt.label}</span>
                  </label>
                ))}
              </div>

              <div className="mt-4">
                <label className="text-xs mb-1 block" style={{ color: "oklch(0.6 0.02 240)" }}>
                  ملاحظات إضافية
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="أضف أي ملاحظات أو تعليمات خاصة للتقرير..."
                />
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200"
              style={{
                background: generating ? "oklch(0.55 0.2 240 / 0.1)" : "oklch(0.55 0.2 240 / 0.25)",
                border: "1px solid oklch(0.55 0.2 240 / 0.5)",
                color: "oklch(0.7 0.15 220)",
              }}
            >
              {generating ? "جاري إنشاء التقرير..." : "إنشاء التقرير"}
            </button>
          </div>

          {/* Preview Panel */}
          <div className="flex flex-col gap-4">
            <div className="predictive-risk-card overflow-hidden">
              <div className="section-header">
                <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 220)" }}>
                  معاينة التقرير
                </span>
              </div>
              <div className="p-4">
                {generated ? (
                  <div className="slide-in">
                    <div
                      className="p-4 rounded-lg mb-4"
                      style={{
                        background: "oklch(0.65 0.18 145 / 0.1)",
                        border: "1px solid oklch(0.65 0.18 145 / 0.3)",
                      }}
                    >
                      <p className="text-xs font-semibold mb-1" style={{ color: "oklch(0.65 0.18 145)" }}>
                        ✓ تم إنشاء التقرير بنجاح
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
                        {reportTypes.find((r) => r.id === form.reportType)?.label}
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
                        {form.facility}
                      </p>
                      <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
                        {form.startDate} - {form.endDate}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2">
                      {[
                        { icon: Download, label: "تحميل PDF" },
                        { icon: Printer, label: "طباعة" },
                        { icon: Send, label: "إرسال بالبريد" },
                      ].map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.label}
                            onClick={() => toast.info(`${action.label} - قيد التطوير`)}
                            className="flex items-center gap-2 px-3 py-2 rounded text-xs transition-all"
                            style={{
                              background: "oklch(0.16 0.018 240)",
                              border: "1px solid oklch(0.22 0.02 240)",
                              color: "oklch(0.7 0.02 240)",
                            }}
                          >
                            <Icon size={12} style={{ color: "oklch(0.55 0.2 240)" }} />
                            {action.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText size={32} className="mx-auto mb-2" style={{ color: "oklch(0.35 0.02 240)" }} />
                    <p className="text-xs" style={{ color: "oklch(0.45 0.02 240)" }}>
                      اضغط على "إنشاء التقرير" لمعاينة النتيجة
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="predictive-risk-card p-4">
              <h3 className="text-xs font-semibold mb-3" style={{ color: "oklch(0.7 0.02 240)" }}>
                إحصائيات سريعة
              </h3>
              {[
                { label: "إجمالي المخاطر", value: "24", color: "oklch(0.55 0.2 240)" },
                { label: "مخاطر عالية", value: "8", color: "oklch(0.6 0.22 25)" },
                { label: "معايير مطابقة", value: "5/8", color: "oklch(0.65 0.18 145)" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center justify-between py-2"
                  style={{ borderBottom: idx < 2 ? "1px solid oklch(0.2 0.018 240)" : "none" }}>
                  <span className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>{stat.label}</span>
                  <span className="text-sm font-bold" style={{ color: stat.color }}>{stat.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
