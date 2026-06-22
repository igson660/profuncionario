import { useState, useEffect } from "react";
import { CourseSelector } from "@/components/CourseSelector";
import { MeetingInfo } from "@/components/MeetingInfo";
import { AttendanceTable } from "@/components/AttendanceTable";
import { SummaryCards } from "@/components/SummaryCards";
import { PdfGenerator } from "@/components/PdfGenerator";
import { COURSES_DATA, COLORS } from "@/constants/constants";
import {
  StudentAttendance,
  AttendanceStatus,
  AttendanceSummary,
} from "@/types/attendance";
import { RefreshCw, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(
    COURSES_DATA[0].id
  );
  const [selectedTurma, setSelectedTurma] = useState<string>(
    COURSES_DATA[0].turmas[0]
  );
  const [selectedComponente, setSelectedComponente] = useState<string>(
    COURSES_DATA[0].componentes[0]
  );
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>(
    COURSES_DATA[0].periodos[0]
  );
  const [selectedPolo, setSelectedPolo] = useState<string>(
    COURSES_DATA[0].polos[0]
  );
  const [selectedProfessor, setSelectedProfessor] = useState<string>(
    COURSES_DATA[0].professores[0]
  );
  const [mediadorPresencial, setMediadorPresencial] =
    useState<string>("Nome do Mediador");

  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [students, setStudents] = useState<StudentAttendance[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary>({
    total: 0,
    present: 0,
    absent: 0,
    justified: 0,
  });

  const currentCourse = COURSES_DATA.find(c => c.id === selectedCourseId);

  // Initialize with current date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  // Initialize students when course changes
  useEffect(() => {
    if (currentCourse) {
      const initialStudents: StudentAttendance[] = currentCourse.alunos.map(
        name => ({
          name,
          status: "P" as AttendanceStatus,
        })
      );
      setStudents(initialStudents);
    }
  }, [selectedCourseId, currentCourse]);

  // Update summary whenever students change
  useEffect(() => {
    const newSummary: AttendanceSummary = {
      total: students.length,
      present: students.filter(s => s.status === "P").length,
      absent: students.filter(s => s.status === "A").length,
      justified: students.filter(s => s.status === "J").length,
    };
    setSummary(newSummary);
  }, [students]);

  const handleCourseChange = (courseId: string) => {
    const newCourse = COURSES_DATA.find(c => c.id === courseId);
    if (newCourse) {
      setSelectedCourseId(courseId);
      setSelectedTurma(newCourse.turmas[0]);
      setSelectedComponente(newCourse.componentes[0]);
      setSelectedPeriodo(newCourse.periodos[0]);
      setSelectedPolo(newCourse.polos[0]);
      setSelectedProfessor(newCourse.professores[0]);
    }
  };

  const handleStatusChange = (index: number, status: AttendanceStatus) => {
    const updatedStudents = [...students];
    updatedStudents[index].status = status;
    setStudents(updatedStudents);
  };

  const handleReset = () => {
    if (
      window.confirm(
        "Tem certeza que deseja reiniciar os dados? Esta ação não pode ser desfeita."
      )
    ) {
      window.location.reload();
    }
  };

  const isFormValid = date.trim() !== "" && description.trim() !== "";

  // Prepare course info for PDF
  const courseInfo = {
    curso: currentCourse?.nome || "",
    turma: selectedTurma,
    componenteCurricular: selectedComponente,
    periodo: selectedPeriodo,
    cargaHoraria: "120h",
    professorFormador: selectedProfessor,
    mediadorPresencial: mediadorPresencial,
    poloMunicipio: selectedPolo,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header com Gradiente */}
      <header className="relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.accent} 100%)`,
          }}
        />
        <div
          className="relative py-12 px-4 text-white"
          style={{ backgroundColor: COLORS.primary }}
        >
          <div className="container mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen size={36} className="text-yellow-300" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Sistema de Frequência
              </h1>
            </div>
            <p className="text-white/90 text-lg md:text-xl">
              Programa Profuncionário
            </p>
            <div className="mt-4 h-1 w-24 bg-yellow-300 rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="space-y-8">
          {/* Course Selector Section */}
          <section className="animate-fade-in">
            <div className="mb-4 flex items-center gap-2">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ color: COLORS.primary }}
              >
                Seleção de Curso
              </h2>
            </div>
            <CourseSelector
              selectedCourseId={selectedCourseId}
              selectedTurma={selectedTurma}
              selectedComponente={selectedComponente}
              selectedPeriodo={selectedPeriodo}
              selectedPolo={selectedPolo}
              selectedProfessor={selectedProfessor}
              onCourseChange={handleCourseChange}
              onTurmaChange={setSelectedTurma}
              onComponenteChange={setSelectedComponente}
              onPeriodoChange={setSelectedPeriodo}
              onPoloChange={setSelectedPolo}
              onProfessorChange={setSelectedProfessor}
            />
          </section>

          {/* Meeting Info Section */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ color: COLORS.primary }}
              >
                Encontro Presencial
              </h2>
            </div>
            <MeetingInfo
              date={date}
              onDateChange={setDate}
              description={description}
              onDescriptionChange={setDescription}
            />
          </section>

          {/* Summary Cards */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="mb-6 flex items-center gap-2">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ color: COLORS.primary }}
              >
                Resumo em Tempo Real
              </h2>
            </div>
            <SummaryCards summary={summary} />
          </section>

          {/* Attendance Table */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="mb-4 flex items-center gap-2">
              <div
                className="w-1 h-8 rounded-full"
                style={{ backgroundColor: COLORS.primary }}
              />
              <h2
                className="text-2xl font-bold"
                style={{ color: COLORS.primary }}
              >
                Registro de Frequência
              </h2>
            </div>
            <AttendanceTable
              students={students}
              onStatusChange={handleStatusChange}
            />
          </section>

          {/* Action Buttons */}
          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex gap-4 flex-col sm:flex-row">
              <div className="flex-1">
                <PdfGenerator
                  date={date}
                  description={description}
                  students={students}
                  isValid={isFormValid}
                  courseInfo={courseInfo}
                />
              </div>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 font-semibold gap-2 border-2 transition-all hover:shadow-lg"
                style={{
                  borderColor: COLORS.primary,
                  color: COLORS.primary,
                }}
              >
                <RefreshCw size={20} />
                Reiniciar
              </Button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 text-center border-t border-gray-200 bg-white/50 backdrop-blur-sm">
        <p className="text-sm text-gray-600">
          © 2025 Sistema de Frequência - Programa Profuncionário
        </p>
        <p className="text-xs text-gray-500 mt-2">Created by Igson Félix</p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
