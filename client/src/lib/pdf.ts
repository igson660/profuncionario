import jsPDF from "jspdf";
import { COLORS } from "@/constants/constants";
import { StudentAttendance } from "@/types/attendance";

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

export function generateAttendancePDF(
  date: string,
  description: string,
  students: StudentAttendance[],
  courseInfo: CourseInfo
) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - 2 * margin;

  let yPosition = margin;

  // Helper function to add text
  const addText = (
    text: string,
    fontSize: number,
    fontStyle: "normal" | "bold" = "normal",
    color: string = COLORS.text,
    align: "left" | "center" | "right" = "left"
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    doc.setTextColor(
      parseInt(color.slice(1, 3), 16),
      parseInt(color.slice(3, 5), 16),
      parseInt(color.slice(5, 7), 16)
    );
    doc.text(text, margin, yPosition, { align, maxWidth: contentWidth });
    yPosition += fontSize / 2.5;
  };

  // Helper function to add a line
  const addLine = () => {
    doc.setDrawColor(
      parseInt(COLORS.border.slice(1, 3), 16),
      parseInt(COLORS.border.slice(3, 5), 16),
      parseInt(COLORS.border.slice(5, 7), 16)
    );
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 5;
  };

  // Header with course info
  doc.setFillColor(
    parseInt(COLORS.primary.slice(1, 3), 16),
    parseInt(COLORS.primary.slice(3, 5), 16),
    parseInt(COLORS.primary.slice(5, 7), 16)
  );
  doc.rect(margin, yPosition - 3, contentWidth, 25, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("FOLHA DE FREQUÊNCIA", pageWidth / 2, yPosition + 5, {
    align: "center",
  });

  yPosition += 25;

  // Course information in two columns
  const infoBoxHeight = 35;
  const colWidth = contentWidth / 2 - 2;

  doc.setDrawColor(
    parseInt(COLORS.border.slice(1, 3), 16),
    parseInt(COLORS.border.slice(3, 5), 16),
    parseInt(COLORS.border.slice(5, 7), 16)
  );
  doc.rect(margin, yPosition, colWidth, infoBoxHeight);
  doc.rect(margin + colWidth + 4, yPosition, colWidth, infoBoxHeight);

  const infoYStart = yPosition + 2;
  doc.setTextColor(
    parseInt(COLORS.text.slice(1, 3), 16),
    parseInt(COLORS.text.slice(3, 5), 16),
    parseInt(COLORS.text.slice(5, 7), 16)
  );
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");

  // Left column
  let infoY = infoYStart;
  doc.text("Curso:", margin + 2, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(courseInfo.curso, margin + 2, infoY + 3);

  infoY += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Turma:", margin + 2, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(courseInfo.turma, margin + 2, infoY + 3);

  infoY += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Componente:", margin + 2, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(courseInfo.componenteCurricular, margin + 2, infoY + 3);

  // Right column
  infoY = infoYStart;
  doc.setFont("helvetica", "bold");
  doc.text("Período:", margin + colWidth + 6, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(courseInfo.periodo, margin + colWidth + 6, infoY + 3);

  infoY += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Carga Horária:", margin + colWidth + 6, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(courseInfo.cargaHoraria, margin + colWidth + 6, infoY + 3);

  infoY += 8;
  doc.setFont("helvetica", "bold");
  doc.text("Polo/Município:", margin + colWidth + 6, infoY);
  doc.setFont("helvetica", "normal");
  doc.text(courseInfo.poloMunicipio, margin + colWidth + 6, infoY + 3);

  yPosition += infoBoxHeight + 5;

  // Meeting information
  addText("DADOS DO ENCONTRO PRESENCIAL", 11, "bold", COLORS.primary);
  addText(`Data: ${date}`, 10);
  addText(`Descrição das Atividades: ${description}`, 10);
  yPosition += 3;

  // Attendance table
  addText("FREQUÊNCIA", 11, "bold", COLORS.primary);

  const tableStartY = yPosition;
  const colWidths = [15, 80, 20];
  const rowHeight = 7;
  const headerBgColor = COLORS.primary;

  // Table header
  doc.setFillColor(
    parseInt(headerBgColor.slice(1, 3), 16),
    parseInt(headerBgColor.slice(3, 5), 16),
    parseInt(headerBgColor.slice(5, 7), 16)
  );
  doc.rect(margin, yPosition, contentWidth, rowHeight, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");

  let xPos = margin + 2;
  doc.text("Nº", xPos, yPosition + 4);
  xPos += colWidths[0];
  doc.text("Nome", xPos, yPosition + 4);
  xPos += colWidths[1];
  doc.text("Frequência", xPos, yPosition + 4);

  yPosition += rowHeight;

  // Table rows
  doc.setTextColor(
    parseInt(COLORS.text.slice(1, 3), 16),
    parseInt(COLORS.text.slice(3, 5), 16),
    parseInt(COLORS.text.slice(5, 7), 16)
  );
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  students.forEach((student, index) => {
    // Check if we need a new page
    if (yPosition + rowHeight > pageHeight - margin - 30) {
      doc.addPage();
      yPosition = margin;
    }

    // Alternate row background
    if (index % 2 === 0) {
      doc.setFillColor(245, 247, 252);
      doc.rect(margin, yPosition, contentWidth, rowHeight, "F");
    }

    // Draw borders
    doc.setDrawColor(
      parseInt(COLORS.border.slice(1, 3), 16),
      parseInt(COLORS.border.slice(3, 5), 16),
      parseInt(COLORS.border.slice(5, 7), 16)
    );
    doc.rect(margin, yPosition, contentWidth, rowHeight);

    xPos = margin + 2;
    doc.text((index + 1).toString(), xPos, yPosition + 4);
    xPos += colWidths[0];
    doc.text(student.name, xPos, yPosition + 4);
    xPos += colWidths[1];
    doc.text(student.status, xPos, yPosition + 4);

    yPosition += rowHeight;
  });

  yPosition += 5;

  // Legend
  addText("LEGENDA", 10, "bold", COLORS.primary);
  addText("P = Presente | A = Ausente | J = Justificado", 9);
  yPosition += 5;

  // Signature area
  addText("ASSINATURAS", 10, "bold", COLORS.primary);
  yPosition += 5;

  const signatureBoxHeight = 20;
  const signatureColWidth = (contentWidth - 4) / 3;

  // Signature boxes
  doc.setDrawColor(
    parseInt(COLORS.border.slice(1, 3), 16),
    parseInt(COLORS.border.slice(3, 5), 16),
    parseInt(COLORS.border.slice(5, 7), 16)
  );

  const signatureLabels = [
    `Mediador Presencial\n${courseInfo.mediadorPresencial}`,
    "Coordenador",
  ];
  let signatureX = margin;

  signatureLabels.forEach(label => {
    doc.rect(signatureX, yPosition, signatureColWidth, signatureBoxHeight);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(label, signatureX + 2, yPosition + signatureBoxHeight - 2, {
      maxWidth: signatureColWidth - 4,
    });
    signatureX += signatureColWidth + 2;
  });

  // Generate filename with current date
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  const filename = `frequencia-${year}-${month}-${day}.pdf`;

  // Save the PDF
  doc.save(filename);
}
