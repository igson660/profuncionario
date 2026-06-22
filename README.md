# Sistema de Frequência - Programa Profuncionário

Uma aplicação frontend moderna para registro diário de frequência presencial do Programa Profuncionário, com geração automática de PDF para impressão e assinatura via Gov.br.

## 🎯 Objetivo

O sistema permite que professores registrem a frequência dos alunos durante cada encontro presencial e gerem imediatamente uma folha de frequência em PDF profissional, pronta para impressão e assinatura.

## ✨ Características

- **Seleção Dinâmica de Curso**: Dropdowns para selecionar curso, turma, componente curricular, período, polo/município e professor formador
- **Lista de Alunos Dinâmica**: A lista de alunos é atualizada automaticamente ao mudar de curso
- **Registro de Frequência**: Interface simples e intuitiva para marcar presença, ausência ou justificativa dos alunos
- **Geração de PDF**: Gera automaticamente uma folha de frequência profissional em formato A4
- **Resumo em Tempo Real**: Atualização instantânea de estatísticas (total, presentes, ausentes, justificados)
- **Interface Responsiva**: Funciona perfeitamente em desktop e tablet
- **Identidade Visual Institucional**: Design baseado nas cores do IEPTEC Acre
- **Sem Persistência**: Dados são reiniciados ao atualizar a página (conforme especificado)

## 🛠️ Stack Tecnológico

- **Next.js 15+** - Framework React moderno
- **TypeScript** - Tipagem forte
- **Tailwind CSS** - Estilização utilitária
- **Shadcn/UI** - Componentes de UI profissionais
- **jsPDF** - Geração de PDF
- **Lucide React** - Ícones vetoriais
- **Yarn** - Gerenciador de pacotes

## 📋 Requisitos

- Node.js 18+
- Yarn 4.0+

## 🚀 Instalação e Execução

### 1. Instalar dependências

```bash
yarn install
```

### 2. Iniciar o servidor de desenvolvimento

```bash
yarn dev
```

A aplicação estará disponível em `http://localhost:3000`

### 3. Build para produção

```bash
yarn build
```

### 4. Visualizar build de produção

```bash
yarn preview
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── page.tsx                 # Página principal
│
├── components/
│   ├── CourseSelector.tsx       # Seletor de curso com dropdowns
│   ├── MeetingInfo.tsx          # Data e descrição do encontro
│   ├── AttendanceTable.tsx      # Tabela de frequência
│   ├── SummaryCards.tsx         # Resumo em tempo real
│   └── PdfGenerator.tsx         # Botão para gerar PDF
│
├── constants/
│   └── constants.ts             # Dados de cursos e alunos
│
├── lib/
│   └── pdf.ts                   # Lógica de geração de PDF
│
├── types/
│   └── attendance.ts            # Tipagens TypeScript
│
└── pages/
    └── Home.tsx                 # Página principal
```

## ⚙️ Configuração de Dados

Todos os dados estão centralizados em `src/constants/constants.ts`:

```typescript
export const COURSES_DATA = [
  {
    id: "curso-1",
    nome: "Curso de Educação Infantil",
    turmas: ["Turma 2025.1", "Turma 2025.2", "Turma 2024.2"],
    periodos: ["2025.1", "2025.2", "2024.2"],
    componentes: ["Educação Infantil", "Metodologia", "Prática Pedagógica"],
    professores: ["Prof. Ana Silva", "Prof. Carlos Santos", "Prof. Maria Oliveira"],
    polos: ["Acre", "Rio Branco", "Cruzeiro do Sul"],
    alunos: [
      "João da Silva",
      "Maria Santos",
      "Pedro Oliveira",
      "Ana Costa",
      "Carlos Mendes"
    ]
  },
  // ... mais cursos
];

export const COLORS = {
  primary: "#006B3F",      // Verde institucional
  secondary: "#F7C600",    // Amarelo institucional
  accent: "#1E4D8C",       // Azul institucional
  background: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E5E7EB",
  text: "#1F2937",
  muted: "#6B7280"
};
```

## 🎨 Identidade Visual

A aplicação utiliza as cores institucionais do IEPTEC Acre:

- **Verde Primário** (#006B3F): Cor principal, usada no header e destaques
- **Amarelo Secundário** (#F7C600): Destaque e ênfase
- **Azul Institucional** (#1E4D8C): Cor de acentuação
- **Fundo Claro** (#F8FAFC): Fundo profissional e limpo

## 📝 Funcionalidades Principais

### 1. Seleção de Curso (Novo!)
Dropdowns para selecionar:
- **Curso**: Muda automaticamente os dados relacionados
- **Turma**: Opções disponíveis para o curso selecionado
- **Componente Curricular**: Componentes do curso
- **Período**: Períodos disponíveis
- **Polo/Município**: Polos de atendimento
- **Professor Formador**: Professores do curso

**Importante**: Ao mudar de curso, a lista de alunos é atualizada automaticamente!

### 2. Dados do Encontro
- **Data**: Campo obrigatório com data pré-preenchida com o dia atual
- **Descrição**: Textarea obrigatória para descrever as atividades realizadas

### 3. Registro de Frequência
- Todos os alunos iniciam como "Presente" (P)
- Possibilidade de alterar para "Ausente" (A) ou "Justificado" (J)
- Tabela responsiva com alternância de cores de linha
- Seletor visual para cada aluno

### 4. Resumo em Tempo Real
Atualiza automaticamente:
- Total de alunos
- Número de presentes
- Número de ausentes
- Número de justificados

### 5. Geração de PDF
Ao clicar em "Gerar PDF":
- Valida se todos os campos obrigatórios foram preenchidos
- Gera um PDF profissional em formato A4
- Inclui todas as informações do curso e encontro
- Tabela de frequência com todos os alunos
- Legenda de status
- Áreas para assinatura (Professor Formador, Mediador Presencial, Coordenador)
- Nome do arquivo: `frequencia-AAAA-MM-DD.pdf`

### 6. Reiniciar Dados
Botão para reiniciar todos os dados e recarregar a página (com confirmação).

## 🔄 Fluxo de Uso

1. Abrir a aplicação
2. **Selecionar o curso desejado** (a lista de alunos atualiza automaticamente)
3. Selecionar turma, componente, período, polo e professor conforme necessário
4. Confirmar a data do encontro (pré-preenchida com data atual)
5. Descrever as atividades realizadas
6. Ajustar o status de frequência de cada aluno conforme necessário
7. Visualizar o resumo em tempo real
8. Clicar em "Gerar PDF" para baixar a folha de frequência
9. Imprimir o PDF e coletar assinaturas
10. Opcionalmente, clicar em "Reiniciar" para começar um novo registro

## 📄 Formato do PDF

O PDF gerado inclui:

### Cabeçalho
- Título "FOLHA DE FREQUÊNCIA"
- Informações do curso em caixas destacadas

### Corpo
- Data do encontro
- Descrição das atividades

### Tabela de Frequência
- Número do aluno
- Nome do aluno
- Status de frequência (P, A, J)
- Linhas alternadas para melhor legibilidade
- Compatível com impressão em preto e branco

### Rodapé
- Legenda de status
- Áreas para assinatura (com linhas)
- Espaço para: Professor Formador, Mediador Presencial, Coordenador

## ✅ Boas Práticas Implementadas

- ✓ TypeScript fortemente tipado (sem uso de `any`)
- ✓ Componentes reutilizáveis e bem organizados
- ✓ Separação clara de responsabilidades
- ✓ Sem código duplicado
- ✓ Responsividade completa (mobile, tablet, desktop)
- ✓ Acessibilidade básica
- ✓ Organização profissional de pastas
- ✓ Comentários apenas quando realmente necessários
- ✓ Dados dinâmicos com atualização automática

## 🚫 O que NÃO inclui

Conforme especificado, o sistema **não inclui**:

- ✗ Histórico de chamadas
- ✗ Banco de dados
- ✗ Backend/API
- ✗ Login/Autenticação
- ✗ Cadastro de usuários
- ✗ Persistência de dados
- ✗ Relatórios históricos
- ✗ Controle de múltiplas turmas simultâneas

## 📱 Responsividade

A aplicação é totalmente responsiva:

- **Mobile**: Layout em coluna única, otimizado para toque
- **Tablet**: Layout em 2-3 colunas, tabela scrollável
- **Desktop**: Layout em 3-6 colunas, tabela completa

## 🎯 Próximos Passos

Para customizar a aplicação:

1. Edite `src/constants/constants.ts` para:
   - Adicionar/remover cursos
   - Alterar lista de alunos por curso
   - Adicionar novos professores ou polos
   - Customizar cores institucionais

2. Modifique `src/lib/pdf.ts` para ajustar o formato do PDF

3. Customize o design em `src/index.css` e componentes

## 📞 Suporte

Para dúvidas ou problemas, consulte:
- Documentação do Next.js: https://nextjs.org/docs
- Documentação do Tailwind CSS: https://tailwindcss.com/docs
- Documentação do Shadcn/UI: https://ui.shadcn.com
- Documentação do jsPDF: https://github.com/parallax/jsPDF

## 📄 Licença

MIT

---

**Desenvolvido para o Programa Profuncionário**
