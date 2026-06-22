import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { COLORS, COURSES_DATA } from "@/constants/constants";

interface CourseSelectorProps {
  selectedCourseId: string;
  selectedTurma: string;
  selectedComponente: string;
  selectedPeriodo: string;
  selectedPolo: string;
  selectedProfessor: string;
  onCourseChange: (courseId: string) => void;
  onTurmaChange: (turma: string) => void;
  onComponenteChange: (componente: string) => void;
  onPeriodoChange: (periodo: string) => void;
  onPoloChange: (polo: string) => void;
  onProfessorChange: (professor: string) => void;
}

export function CourseSelector({
  selectedCourseId,
  selectedTurma,
  selectedComponente,
  selectedPeriodo,
  selectedPolo,
  selectedProfessor,
  onCourseChange,
  onTurmaChange,
  onComponenteChange,
  onPeriodoChange,
  onPoloChange,
  onProfessorChange
}: CourseSelectorProps) {
  const currentCourse = COURSES_DATA.find((c) => c.id === selectedCourseId);

  if (!currentCourse) return null;

  return (
    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Curso */}
        <div className="group">
          <Label htmlFor="course" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Curso *
          </Label>
          <Select value={selectedCourseId} onValueChange={onCourseChange}>
            <SelectTrigger 
              id="course" 
              className="mt-3 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors h-11 rounded-lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {COURSES_DATA.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Turma */}
        <div className="group">
          <Label htmlFor="turma" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Turma *
          </Label>
          <Select value={selectedTurma} onValueChange={onTurmaChange}>
            <SelectTrigger 
              id="turma" 
              className="mt-3 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors h-11 rounded-lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currentCourse.turmas.map((turma) => (
                <SelectItem key={turma} value={turma}>
                  {turma}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Componente Curricular */}
        <div className="group">
          <Label htmlFor="componente" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Componente *
          </Label>
          <Select value={selectedComponente} onValueChange={onComponenteChange}>
            <SelectTrigger 
              id="componente" 
              className="mt-3 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors h-11 rounded-lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currentCourse.componentes.map((componente) => (
                <SelectItem key={componente} value={componente}>
                  {componente}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Período */}
        <div className="group">
          <Label htmlFor="periodo" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Período *
          </Label>
          <Select value={selectedPeriodo} onValueChange={onPeriodoChange}>
            <SelectTrigger 
              id="periodo" 
              className="mt-3 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors h-11 rounded-lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currentCourse.periodos.map((periodo) => (
                <SelectItem key={periodo} value={periodo}>
                  {periodo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Polo/Município */}
        <div className="group">
          <Label htmlFor="polo" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Polo/Município *
          </Label>
          <Select value={selectedPolo} onValueChange={onPoloChange}>
            <SelectTrigger 
              id="polo" 
              className="mt-3 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors h-11 rounded-lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currentCourse.polos.map((polo) => (
                <SelectItem key={polo} value={polo}>
                  {polo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Professor Formador */}
        <div className="group">
          <Label htmlFor="professor" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
            Professor *
          </Label>
          <Select value={selectedProfessor} onValueChange={onProfessorChange}>
            <SelectTrigger 
              id="professor" 
              className="mt-3 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors h-11 rounded-lg"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currentCourse.professores.map((professor) => (
                <SelectItem key={professor} value={professor}>
                  {professor}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
