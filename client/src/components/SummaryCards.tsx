import { Card } from "@/components/ui/card";
import { COLORS } from "@/constants/constants";
import { AttendanceSummary } from "@/types/attendance";
import { Users, Check, X, FileCheck } from "lucide-react";

interface SummaryCardsProps {
  summary: AttendanceSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const stats = [
    {
      label: "Total de Alunos",
      value: summary.total,
      icon: Users,
      color: COLORS.accent,
      bgGradient: "from-blue-50 to-blue-100"
    },
    {
      label: "Presentes",
      value: summary.present,
      icon: Check,
      color: "#10B981",
      bgGradient: "from-green-50 to-green-100"
    },
    {
      label: "Ausentes",
      value: summary.absent,
      icon: X,
      color: "#EF4444",
      bgGradient: "from-red-50 to-red-100"
    },
    {
      label: "Justificados",
      value: summary.justified,
      icon: FileCheck,
      color: "#F59E0B",
      bgGradient: "from-amber-50 to-amber-100"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card
            key={stat.label}
            className={`p-6 text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-default bg-gradient-to-br ${stat.bgGradient}`}
          >
            <div className="flex justify-center mb-3">
              <div
                className="p-3 rounded-full"
                style={{
                  backgroundColor: `${stat.color}15`,
                }}
              >
                <Icon size={24} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-3xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </p>
            <p className="text-xs text-gray-600 mt-2 font-semibold uppercase tracking-wide">
              {stat.label}
            </p>
          </Card>
        );
      })}
    </div>
  );
}
