/**
 * تنبؤ المخاطر الذكي - Previous Reports Page
 * Design: Professional Enterprise Dark Dashboard
 * Features: Reports archive, search, filter, view/download
 */

import Layout from "@/components/Layout";
import { FolderOpen, Search, Download, Eye, Filter, FileText } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Report {
  id: number;
  title: string;
  type: string;
  facility: string;
  date: string;
  time: string;
  status: "completed" | "draft";
  risks: number;
  size: string;
}

const allReports: Report[] = [
  { id: 1, title: "تقرير شامل للمخاطر - الربع الثالث", type: "شامل", facility: "المنشأة الرئيسية - الدمام", date: "2024-07-23", time: "13:39:05", status: "completed", risks: 24, size: "2.4 MB" },
  { id: 2, title: "تقرير مخاطر الحريق - يوليو 2024", type: "حريق", facility: "المنشأة الرئيسية - الدمام", date: "2024-07-23", time: "13:37:38", status: "completed", risks: 8, size: "1.1 MB" },
  { id: 3, title: "تقرير المخاطر الكيميائية", type: "كيميائي", facility: "منشأة الإنتاج - الجبيل", date: "2024-07-23", time: "13:37:35", status: "completed", risks: 6, size: "0.9 MB" },
  { id: 4, title: "تقرير معايير السلامة - يونيو 2024", type: "سلامة", facility: "المنشأة الرئيسية - الدمام", date: "2024-07-23", time: "13:37:08", status: "completed", risks: 3, size: "1.8 MB" },
  { id: 5, title: "تقرير الحوادث - الربع الثاني", type: "حوادث", facility: "مستودع المواد - الرياض", date: "2024-04-23", time: "13:37:08", status: "completed", risks: 12, size: "3.2 MB" },
  { id: 6, title: "تقرير المخاطر الكهربائية", type: "كهربائي", facility: "محطة الضخ - ينبع", date: "2024-04-23", time: "10:22:15", status: "draft", risks: 5, size: "0.7 MB" },
  { id: 7, title: "تقرير شامل - الربع الأول 2024", type: "شامل", facility: "المنشأة الرئيسية - الدمام", date: "2024-01-15", time: "09:00:00", status: "completed", risks: 19, size: "2.8 MB" },
];

const typeColors: Record<string, string> = {
  شامل: "oklch(0.55 0.2 240)",
  حريق: "oklch(0.6 0.22 25)",
  كيميائي: "oklch(0.65 0.18 80)",
  سلامة: "oklch(0.65 0.18 145)",
  حوادث: "oklch(0.55 0.15 300)",
  كهربائي: "oklch(0.65 0.18 80)",
};

export default function PreviousReports() {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  const filtered = allReports.filter((r) => {
    const matchSearch =
      r.title.includes(search) || r.facility.includes(search) || r.type.includes(search);
    const matchType = filterType === "all" || r.type === filterType;
    return matchSearch && matchType;
  });

  const types = ["all", ...Array.from(new Set(allReports.map((r) => r.type)))];

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
            <FolderOpen size={20} style={{ color: "oklch(0.7 0.15 220)" }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: "oklch(0.92 0.01 220)" }}>
              التقارير السابقة
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
              أرشيف التقارير المنشأة ({allReports.length} تقرير)
            </p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative">
            <Search
              size={14}
              className="absolute top-1/2 -translate-y-1/2 right-3"
              style={{ color: "oklch(0.5 0.02 240)" }}
            />
            <input
              style={{
                background: "oklch(0.16 0.018 240)",
                border: "1px solid oklch(0.25 0.02 240)",
                color: "oklch(0.85 0.01 220)",
                borderRadius: "0.5rem",
                padding: "0.5rem 2.25rem 0.5rem 0.75rem",
                width: "100%",
                fontSize: "0.875rem",
                outline: "none",
              }}
              placeholder="بحث في التقارير..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} style={{ color: "oklch(0.5 0.02 240)" }} />
            <div className="flex gap-1 flex-wrap">
              {types.map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className="px-2.5 py-1 rounded text-xs font-medium transition-all"
                  style={{
                    background: filterType === t ? "oklch(0.55 0.2 240 / 0.2)" : "oklch(0.16 0.018 240)",
                    border: `1px solid ${filterType === t ? "oklch(0.55 0.2 240 / 0.5)" : "oklch(0.22 0.02 240)"}`,
                    color: filterType === t ? "oklch(0.7 0.15 220)" : "oklch(0.6 0.02 240)",
                  }}
                >
                  {t === "all" ? "الكل" : t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((report) => (
            <div key={report.id} className="predictive-risk-card p-4 flex flex-col gap-3">
              {/* Report Header */}
              <div className="flex items-start gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: `${typeColors[report.type] || "oklch(0.55 0.2 240)"} / 0.1`.replace("/ 0.1", ""),
                    border: `1px solid ${typeColors[report.type] || "oklch(0.55 0.2 240)"} / 0.3`.replace("/ 0.3", ""),
                    opacity: 0.8,
                  }}
                >
                  <FileText size={16} style={{ color: typeColors[report.type] || "oklch(0.55 0.2 240)" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold leading-tight mb-1" style={{ color: "oklch(0.85 0.01 220)" }}>
                    {report.title}
                  </h3>
                  <p className="text-xs" style={{ color: "oklch(0.55 0.02 240)" }}>
                    {report.facility}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <span
                  className="px-2 py-0.5 rounded text-xs font-medium"
                  style={{
                    background: `oklch(0.55 0.2 240 / 0.1)`,
                    border: `1px solid oklch(0.55 0.2 240 / 0.3)`,
                    color: typeColors[report.type] || "oklch(0.55 0.2 240)",
                  }}
                >
                  {report.type}
                </span>
                <span
                  className="px-2 py-0.5 rounded text-xs"
                  style={{
                    background: report.status === "completed" ? "oklch(0.65 0.18 145 / 0.1)" : "oklch(0.65 0.18 80 / 0.1)",
                    border: `1px solid ${report.status === "completed" ? "oklch(0.65 0.18 145 / 0.3)" : "oklch(0.65 0.18 80 / 0.3)"}`,
                    color: report.status === "completed" ? "oklch(0.65 0.18 145)" : "oklch(0.65 0.18 80)",
                  }}
                >
                  {report.status === "completed" ? "مكتمل" : "مسودة"}
                </span>
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs" style={{ color: "oklch(0.5 0.02 240)" }}>
                <span className="font-mono">{report.date} {report.time}</span>
                <span>{report.size}</span>
              </div>

              <div className="flex items-center justify-between text-xs" style={{ color: "oklch(0.5 0.02 240)" }}>
                <span>عدد المخاطر: <span style={{ color: "oklch(0.6 0.22 25)" }}>{report.risks}</span></span>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-1 border-t" style={{ borderColor: "oklch(0.2 0.018 240)" }}>
                <button
                  onClick={() => toast.info("عرض التقرير - قيد التطوير")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-all"
                  style={{
                    background: "oklch(0.55 0.2 240 / 0.1)",
                    border: "1px solid oklch(0.55 0.2 240 / 0.3)",
                    color: "oklch(0.7 0.15 220)",
                  }}
                >
                  <Eye size={11} />
                  عرض
                </button>
                <button
                  onClick={() => toast.info("تحميل التقرير - قيد التطوير")}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded text-xs transition-all"
                  style={{
                    background: "oklch(0.65 0.18 145 / 0.1)",
                    border: "1px solid oklch(0.65 0.18 145 / 0.3)",
                    color: "oklch(0.65 0.18 145)",
                  }}
                >
                  <Download size={11} />
                  تحميل
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen size={40} className="mx-auto mb-3" style={{ color: "oklch(0.35 0.02 240)" }} />
            <p style={{ color: "oklch(0.5 0.02 240)" }}>لا توجد تقارير تطابق البحث</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
