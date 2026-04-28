/**
 * تنبؤ المخاطر الذكي - Add/Edit Risk Page
 * Design: Professional Enterprise Dark Dashboard
 * Features: Risk form, categories, likelihood/impact selectors
 */

import Layout from "@/components/Layout";
import { Settings, Plus, Pencil, Trash2, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface Risk {
  id: number;
  name: string;
  category: string;
  likelihood: number;
  impact: number;
  level: string;
  description: string;
}

const initialRisks: Risk[] = [
  { id: 1, name: "تسرب غاز", category: "كيميائية", likelihood: 3, impact: 5, level: "H", description: "خطر تسرب الغاز في منطقة الإنتاج" },
  { id: 2, name: "حريق كهربائي", category: "كهربائية", likelihood: 4, impact: 4, level: "H", description: "خطر اشتعال الحرائق من الدوائر الكهربائية" },
  { id: 3, name: "سقوط من ارتفاع", category: "ميكانيكية", likelihood: 3, impact: 3, level: "M", description: "مخاطر السقوط أثناء أعمال الصيانة" },
  { id: 4, name: "ضوضاء مفرطة", category: "بيئة العمل", likelihood: 5, impact: 2, level: "M", description: "مستويات ضوضاء تتجاوز الحدود المسموحة" },
];

const categories = ["كيميائية", "كهربائية", "ميكانيكية", "بيئة العمل", "حريق", "بيئية", "أخرى"];
const likelihoodOptions = [
  { value: 1, label: "نادر (1)" },
  { value: 2, label: "غير محتمل (2)" },
  { value: 3, label: "ممكن (3)" },
  { value: 4, label: "محتمل (4)" },
  { value: 5, label: "شبه مؤكد (5)" },
];
const impactOptions = [
  { value: 1, label: "ضئيل (1)" },
  { value: 2, label: "طفيف (2)" },
  { value: 3, label: "متوسط (3)" },
  { value: 4, label: "كبير (4)" },
  { value: 5, label: "كارثي (5)" },
];

function calcLevel(likelihood: number, impact: number): string {
  const score = likelihood * impact;
  if (score >= 12) return "H";
  if (score >= 4) return "M";
  return "L";
}

export default function AddRisk() {
  const [risks, setRisks] = useState<Risk[]>(initialRisks);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: categories[0],
    likelihood: 3,
    impact: 3,
    description: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) {
      toast.error("يرجى إدخال اسم الخطر");
      return;
    }
    const level = calcLevel(form.likelihood, form.impact);
    if (editingId !== null) {
      setRisks(risks.map((r) =>
        r.id === editingId ? { ...r, ...form, level } : r
      ));
      toast.success("تم تحديث الخطر بنجاح");
    } else {
      setRisks([...risks, { id: Date.now(), ...form, level }]);
      toast.success("تم إضافة الخطر بنجاح");
    }
    setShowForm(false);
    setEditingId(null);
    setForm({ name: "", category: categories[0], likelihood: 3, impact: 3, description: "" });
  };

  const handleEdit = (risk: Risk) => {
    setForm({
      name: risk.name,
      category: risk.category,
      likelihood: risk.likelihood,
      impact: risk.impact,
      description: risk.description,
    });
    setEditingId(risk.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setRisks(risks.filter((r) => r.id !== id));
    toast.success("تم حذف الخطر");
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
            <Settings size={20} style={{ color: "oklch(0.7 0.15 220)" }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: "oklch(0.92 0.01 220)" }}>
              إضافة وتعديل المخاطر
            </h1>
            <p className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>
              إدارة سجل المخاطر المؤسسية
            </p>
          </div>
          <button
            onClick={() => { setShowForm(true); setEditingId(null); setForm({ name: "", category: categories[0], likelihood: 3, impact: 3, description: "" }); }}
            className="mr-auto flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
            style={{
              background: "oklch(0.55 0.2 240 / 0.2)",
              border: "1px solid oklch(0.55 0.2 240 / 0.5)",
              color: "oklch(0.7 0.15 220)",
            }}
          >
            <Plus size={14} />
            إضافة خطر جديد
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div
            className="predictive-risk-card p-5 mb-6 slide-in"
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: "oklch(0.85 0.01 220)" }}>
              {editingId !== null ? "تعديل الخطر" : "إضافة خطر جديد"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "oklch(0.6 0.02 240)" }}>
                  اسم الخطر *
                </label>
                <input
                  style={inputStyle}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="أدخل اسم الخطر"
                />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "oklch(0.6 0.02 240)" }}>
                  التصنيف
                </label>
                <select
                  style={inputStyle}
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "oklch(0.6 0.02 240)" }}>
                  الاحتمالية
                </label>
                <select
                  style={inputStyle}
                  value={form.likelihood}
                  onChange={(e) => setForm({ ...form, likelihood: Number(e.target.value) })}
                >
                  {likelihoodOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "oklch(0.6 0.02 240)" }}>
                  التأثير
                </label>
                <select
                  style={inputStyle}
                  value={form.impact}
                  onChange={(e) => setForm({ ...form, impact: Number(e.target.value) })}
                >
                  {impactOptions.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-xs mb-1 block" style={{ color: "oklch(0.6 0.02 240)" }}>
                  الوصف
                </label>
                <textarea
                  style={{ ...inputStyle, minHeight: "80px", resize: "vertical" }}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="وصف تفصيلي للخطر..."
                />
              </div>
            </div>

            {/* Preview Level */}
            <div className="flex items-center gap-3 mt-3 p-3 rounded-lg"
              style={{ background: "oklch(0.16 0.018 240)", border: "1px solid oklch(0.22 0.02 240)" }}>
              <span className="text-xs" style={{ color: "oklch(0.6 0.02 240)" }}>مستوى الخطر المحسوب:</span>
              <div className={`px-3 py-1 rounded text-xs font-bold ${
                calcLevel(form.likelihood, form.impact) === "H"
                  ? "risk-cell-high"
                  : calcLevel(form.likelihood, form.impact) === "M"
                  ? "risk-cell-medium"
                  : "risk-cell-low"
              }`}>
                {calcLevel(form.likelihood, form.impact) === "H" ? "عالي" : calcLevel(form.likelihood, form.impact) === "M" ? "متوسط" : "منخفض"}
              </div>
              <span className="text-xs font-mono" style={{ color: "oklch(0.55 0.2 240)" }}>
                الدرجة: {form.likelihood * form.impact}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: "oklch(0.55 0.2 240 / 0.2)",
                  border: "1px solid oklch(0.55 0.2 240 / 0.5)",
                  color: "oklch(0.7 0.15 220)",
                }}
              >
                <Save size={14} />
                {editingId !== null ? "حفظ التعديلات" : "إضافة الخطر"}
              </button>
              <button
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="px-4 py-2 rounded-lg text-sm font-medium"
                style={{
                  background: "oklch(0.18 0.02 240)",
                  border: "1px solid oklch(0.25 0.02 240)",
                  color: "oklch(0.6 0.02 240)",
                }}
              >
                إلغاء
              </button>
            </div>
          </div>
        )}

        {/* Risks Table */}
        <div className="predictive-risk-card overflow-hidden">
          <div className="section-header">
            <span className="text-sm font-semibold" style={{ color: "oklch(0.85 0.01 220)" }}>
              سجل المخاطر ({risks.length})
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "oklch(0.16 0.018 240)", borderBottom: "1px solid oklch(0.22 0.02 240)" }}>
                  {["الخطر", "التصنيف", "الاحتمالية", "التأثير", "المستوى", "الإجراءات"].map((h) => (
                    <th key={h} className="px-4 py-3 text-right text-xs font-semibold"
                      style={{ color: "oklch(0.6 0.02 240)" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {risks.map((risk, idx) => (
                  <tr
                    key={risk.id}
                    className="transition-colors duration-150"
                    style={{
                      borderBottom: "1px solid oklch(0.18 0.018 240)",
                      background: idx % 2 === 0 ? "transparent" : "oklch(0.13 0.016 240 / 0.5)",
                    }}
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium" style={{ color: "oklch(0.85 0.01 220)" }}>{risk.name}</div>
                        <div className="text-xs" style={{ color: "oklch(0.5 0.02 240)" }}>{risk.description}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs" style={{ color: "oklch(0.7 0.02 240)" }}>{risk.category}</td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "oklch(0.7 0.02 240)" }}>{risk.likelihood}</td>
                    <td className="px-4 py-3 text-xs font-mono" style={{ color: "oklch(0.7 0.02 240)" }}>{risk.impact}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        risk.level === "H" ? "risk-cell-high" : risk.level === "M" ? "risk-cell-medium" : "risk-cell-low"
                      }`}>
                        {risk.level === "H" ? "عالي" : risk.level === "M" ? "متوسط" : "منخفض"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(risk)} className="p-1.5 rounded transition-colors"
                          style={{ color: "oklch(0.55 0.2 240)", background: "oklch(0.55 0.2 240 / 0.1)" }}>
                          <Pencil size={12} />
                        </button>
                        <button onClick={() => handleDelete(risk.id)} className="p-1.5 rounded transition-colors"
                          style={{ color: "oklch(0.6 0.22 25)", background: "oklch(0.6 0.22 25 / 0.1)" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
