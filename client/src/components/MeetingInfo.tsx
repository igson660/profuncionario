import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { COLORS } from "@/constants/constants";
import { Calendar, FileText } from "lucide-react";

interface MeetingInfoProps {
  date: string;
  onDateChange: (date: string) => void;
  description: string;
  onDescriptionChange: (description: string) => void;
}

export function MeetingInfo({
  date,
  onDateChange,
  description,
  onDescriptionChange
}: MeetingInfoProps) {
  return (
    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} style={{ color: COLORS.primary }} />
            <Label htmlFor="date" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Data do Encontro Presencial *
            </Label>
          </div>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => onDateChange(e.target.value)}
            required
            className="mt-2 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors h-11 rounded-lg"
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={20} style={{ color: COLORS.primary }} />
            <Label htmlFor="description" className="font-semibold text-gray-700 text-sm uppercase tracking-wide">
              Descrição das Atividades *
            </Label>
          </div>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            required
            placeholder="Descreva as atividades realizadas no encontro..."
            className="mt-2 border-2 border-gray-200 hover:border-gray-300 focus:border-gray-400 transition-colors rounded-lg min-h-28 p-4 resize-none"
          />
        </div>
      </div>
    </Card>
  );
}
