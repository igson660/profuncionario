import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { COLORS } from "@/constants/constants";
import { StudentAttendance, AttendanceStatus } from "@/types/attendance";
import { Users } from "lucide-react";

interface AttendanceTableProps {
  students: StudentAttendance[];
  onStatusChange: (index: number, status: AttendanceStatus) => void;
}

export function AttendanceTable({
  students,
  onStatusChange
}: AttendanceTableProps) {
  const statusOptions: { value: AttendanceStatus; label: string; color: string }[] = [
    { value: "P", label: "Presente", color: "#10B981" },
    { value: "A", label: "Ausente", color: "#EF4444" },
    { value: "J", label: "Justificado", color: "#F59E0B" }
  ];

  const getStatusColor = (status: AttendanceStatus) => {
    return statusOptions.find(opt => opt.value === status)?.color || "#6B7280";
  };

  return (
    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2" style={{ borderBottomColor: COLORS.primary }}>
              <th
                className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wide"
                style={{ color: COLORS.primary }}
              >
                Nº
              </th>
              <th
                className="px-4 py-4 text-left text-sm font-bold uppercase tracking-wide"
                style={{ color: COLORS.primary }}
              >
                Nome do Aluno
              </th>
              <th
                className="px-4 py-4 text-center text-sm font-bold uppercase tracking-wide"
                style={{ color: COLORS.primary }}
              >
                Frequência
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className={`border-b transition-all duration-200 hover:bg-blue-50 ${
                  index % 2 === 0 ? "bg-gray-50/50" : "bg-white"
                }`}
              >
                <td className="px-4 py-4 text-sm font-semibold text-gray-600 w-12">
                  {index + 1}
                </td>
                <td className="px-4 py-4 text-sm font-medium text-gray-900">
                  {student.name}
                </td>
                <td className="px-4 py-4 text-center">
                  <Select
                    value={student.status}
                    onValueChange={(value) =>
                      onStatusChange(index, value as AttendanceStatus)
                    }
                  >
                    <SelectTrigger 
                      className="w-40 mx-auto border-2 border-gray-200 hover:border-gray-300 transition-colors h-10 rounded-lg"
                      style={{
                        borderColor: getStatusColor(student.status)
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: getStatusColor(student.status) }}
                        />
                        <SelectValue />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: option.color }}
                            />
                            {option.value} - {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-l-4" style={{ borderLeftColor: COLORS.primary }}>
        <p className="text-sm text-gray-700">
          <span className="font-bold" style={{ color: COLORS.primary }}>Legenda:</span>
          <span className="ml-3">
            <span className="inline-flex items-center gap-2 mr-4">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#10B981" }} />
              <span>P = Presente</span>
            </span>
            <span className="inline-flex items-center gap-2 mr-4">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#EF4444" }} />
              <span>A = Ausente</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "#F59E0B" }} />
              <span>J = Justificado</span>
            </span>
          </span>
        </p>
      </div>
    </Card>
  );
}
