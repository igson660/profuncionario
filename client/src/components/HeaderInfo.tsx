import { Card } from "@/components/ui/card";
import { COURSE_INFO, COLORS } from "@/constants/constants";

export function HeaderInfo() {
  const infoItems = [
    { label: "Curso", value: COURSE_INFO.curso },
    { label: "Turma", value: COURSE_INFO.turma },
    { label: "Componente Curricular", value: COURSE_INFO.componenteCurricular },
    { label: "Período", value: COURSE_INFO.periodo },
    { label: "Carga Horária", value: COURSE_INFO.cargaHoraria },
    { label: "Professor Formador", value: COURSE_INFO.professorFormador },
    { label: "Mediador Presencial", value: COURSE_INFO.mediadorPresencial },
    { label: "Polo/Município", value: COURSE_INFO.poloMunicipio }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {infoItems.map((item) => (
        <Card
          key={item.label}
          className="p-4 border-l-4"
          style={{ borderLeftColor: COLORS.primary }}
        >
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            {item.label}
          </p>
          <p className="text-sm font-medium text-gray-900">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}
