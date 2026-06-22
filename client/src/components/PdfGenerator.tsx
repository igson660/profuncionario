import { Button } from "@/components/ui/button";
import { COLORS } from "@/constants/constants";
import { StudentAttendance } from "@/types/attendance";
import { generateAttendancePDF } from "@/lib/pdf";
import { FileDown, AlertCircle } from "lucide-react";

interface CourseInfo {
  curso: string;
  turma: string;
  componenteCurricular: string;
  periodo: string;
  cargaHoraria: string;
  professorFormador: string;
  mediadorPresencial: string;
  poloMunicipio: string;
}

interface PdfGeneratorProps {
  date: string;
  description: string;
  students: StudentAttendance[];
  isValid: boolean;
  courseInfo: CourseInfo;
}

export function PdfGenerator({
  date,
  description,
  students,
  isValid,
  courseInfo
}: PdfGeneratorProps) {
  const handleGeneratePDF = () => {
    if (!isValid) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    generateAttendancePDF(date, description, students, courseInfo);
  };

  return (
    <div className="flex flex-col gap-3">
      <Button
        onClick={handleGeneratePDF}
        disabled={!isValid}
        className="h-12 font-semibold text-white text-base gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-60 rounded-lg"
        style={{
          backgroundColor: isValid ? COLORS.primary : "#ccc",
          cursor: isValid ? "pointer" : "not-allowed"
        }}
      >
        <FileDown size={20} />
        Gerar PDF
      </Button>
      {!isValid && (
        <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg border border-red-200">
          <AlertCircle size={18} className="text-red-500 flex-shrink-0" />
          <p className="text-sm text-red-700">
            Preencha a data e descrição para gerar o PDF
          </p>
        </div>
      )}
    </div>
  );
}
