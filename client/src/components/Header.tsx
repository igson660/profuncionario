import { BookOpen } from "lucide-react";

export default function Header() {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-400/20 rounded-full blur-3xl" />
      </div>

      <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#E6C75A] to-[#7FBF8A]" />

      <div className="relative bg-gradient-to-r from-[#11703f] via-[#0cbc67] to-[#50b182] shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />

        <div className="container mx-auto px-6 py-10 md:py-14 relative">
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-lg">
              <BookOpen size={42} className="text-white" />
            </div>

            <div>
              <span className="inline-flex items-center px-3 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-white/15 text-white border border-white/20">
                IEPTEC • Acre
              </span>

              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                Controle de Frequência
              </h1>

              <p className="mt-2 text-white/90 text-base md:text-xl">
                PROFUNCIONÁRIO
              </p>

              <div className="mt-5 flex items-center gap-2">
                <div className="h-1.5 w-16 rounded-full bg-[#F2C94C]" />
                <div className="h-1.5 w-24 rounded-full bg-white/40" />
              </div>
            </div>
          </div>
        </div>
        <svg
          className="w-full text-white"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z" />
        </svg>
      </div>
    </header>
  );
}
