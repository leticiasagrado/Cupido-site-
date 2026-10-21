/**
 * The Cupid Method — conteúdo editorial e estrutura interna.
 *
 * Todo o conteúdo desta página é RASCUNHO, aguardando aprovação expressa da
 * administradora antes de publicação comercial. Nenhuma alegação de validação
 * científica, percentagem de compatibilidade ou colaboração psicológica é
 * apresentada como existente.
 */
export const methodDraftNotice =
  'RASCUNHO — NÃO PUBLICADO. Conteúdo editorial preparado para pré-visualização e aprovação expressa da administradora. Não constitui alegação de validação científica nem de colaboração profissional activa.';

export type MethodStep = {
  number: string;
  title: string;
  description: string;
};

export const methodSteps: MethodStep[] = [
  {
    number: '01',
    title: 'Descoberta',
    description:
      'Conhecemos as intenções, expectativas e prioridades de cada candidato através de um processo de entrevista e recolha de informações.',
  },
  {
    number: '02',
    title: 'Afinidades',
    description:
      'Analisamos interesses, valores, estilo de vida e objectivos relacionais, considerando as preferências expressamente partilhadas.',
  },
  {
    number: '03',
    title: 'Curadoria Humana',
    description:
      'A equipa procura identificar possíveis afinidades e incompatibilidades relevantes, respeitando a individualidade de cada pessoa.',
  },
  {
    number: '04',
    title: 'Interesse Mútuo',
    description:
      'Uma apresentação só avança quando ambas as pessoas manifestam interesse e autorizam a partilha das informações necessárias.',
  },
  {
    number: '05',
    title: 'Acompanhamento',
    description:
      'Sempre que o serviço contratado o inclua, acompanhamos o processo e recolhemos feedback para melhorar a pesquisa futura.',
  },
];

export type MethodPrinciple = {
  index: string;
  title: string;
  summary: string;
  detail: string;
};

export const methodPrinciples: MethodPrinciple[] = [
  {
    index: 'I',
    title: 'Humano, não automatizado',
    summary: 'A curadoria é feita por pessoas, não por algoritmos.',
    detail:
      'Não utilizamos reconhecimento facial, inferência de orientação sexual, análise psicológica automatizada ou classificações de personalidade não validadas. As sugestões apoiam a decisão humana — não a substituem.',
  },
  {
    index: 'II',
    title: 'Curadoria atenta',
    summary: 'Cada sugestão nasce da escuta e do critério humano.',
    detail:
      'A nossa equipa dedica tempo a compreender cada pessoa — intenções, valores e estilo de vida — para apresentar afinidades com sentido. A remuneração corresponde ao trabalho humano de pesquisa, escuta e curadoria que dedicamos a cada candidato.',
  },
  {
    index: 'III',
    title: 'Consentimento no centro',
    summary: 'Nenhuma apresentação acontece sem interesse mútuo.',
    detail:
      'A informação é partilhada de forma gradual e autorizada. Um candidato não acede às respostas de outro. As fotografias permanecem privadas e só são partilhadas mediante autorização específica.',
  },
  {
    index: 'IV',
    title: 'Proporcional aos serviços',
    summary: 'O método respeita o incluído em cada plano.',
    detail:
      'O método acompanha os planos Private, Signature, Elite Concierge e Bespoke Private Search, adaptando-se aos serviços incluídos em cada um — da curadoria essencial à pesquisa dedicada e ao acompanhamento mais próximo.',
  },
];

export type QuestionnaireTheme = {
  letter: string;
  title: string;
  intro: string;
  questions: { label: string; help?: string }[];
};

/**
 * Estrutura do questionário aprofundado de compatibilidade — MODO RASCUNHO.
 * Não activo. Não recolhe dados. Será disponibilizado apenas numa fase
 * posterior, mediante convite da equipa e depois de actualizada e aprovada a
 * Política de Privacidade compatível com os dados efectivamente recolhidos.
 */
export const questionnaireDraftNotice =
  'RASCUNHO — QUESTIONÁRIO NÃO ACTIVO. Esta estrutura é uma pré-visualização interna. Não recolhe nem armazena dados. A activação depende da actualização e aprovação da Política de Privacidade compatível com os dados efectivamente recolhidos, e de convite individual da equipa.';

export const questionnaireThemes: QuestionnaireTheme[] = [
  {
    letter: 'A',
    title: 'Intenções relacionais',
    intro: 'Objectivos, compromisso e disponibilidade para conhecer alguém.',
    questions: [
      { label: 'Objectivos para uma futura relação', help: 'Ex.: relação estável, casamento, conhecer gradualmente.' },
      { label: 'Expectativas de compromisso' },
      { label: 'Disponibilidade para conhecer alguém', help: 'Imediata, nos próximos meses, a definir.' },
    ],
  },
  {
    letter: 'B',
    title: 'Estilo de vida',
    intro: 'Rotinas, interesses e disponibilidade geográfica.',
    questions: [
      { label: 'Rotinas' },
      { label: 'Interesses' },
      { label: 'Actividades preferidas' },
      { label: 'Disponibilidade geográfica', help: 'Cidade, Portugal, internacional.' },
    ],
  },
  {
    letter: 'C',
    title: 'Valores e prioridades',
    intro: 'O que orienta as suas decisões de vida e de relação.',
    questions: [
      { label: 'Valores pessoais relevantes para uma relação' },
      { label: 'Expectativas sobre comunicação' },
      { label: 'Prioridades de vida' },
      { label: 'Planos futuros' },
    ],
  },
  {
    letter: 'D',
    title: 'Preferências de compatibilidade',
    intro: 'Características e limites que deseja partilhar voluntariamente.',
    questions: [
      { label: 'Características que valoriza' },
      { label: 'Aspectos importantes numa possível relação' },
      { label: 'Limites e preferências que queira partilhar voluntariamente' },
    ],
  },
];

export const questionnaireGuardrails: string[] = [
  'Não recolher dados de saúde, vida sexual, orientação sexual, religião ou outras categorias especiais sem avaliação jurídica prévia, necessidade demonstrada e fundamento jurídico adequado.',
  'Evitar perguntas excessivamente invasivas.',
  'Não enviar questionários completos por email.',
  'Um candidato não acede às respostas de outro.',
  'Os questionários não são públicos.',
];

export type PsychologistField = {
  label: string;
  description: string;
};

export const psychologistDraftNotice =
  'RASCUNHO — ÁREA NÃO PUBLICADA. Estrutura preparada para uma eventual colaboração futura com psicólogas devidamente habilitadas. A colaboração não existe actualmente. Não são criados perfis fictícios nem anunciadas avaliações psicológicas, testes clínicos ou certificações inexistentes.';

export const psychologistFields: PsychologistField[] = [
  { label: 'Identificação profissional', description: 'Nome e qualificação profissional da colaboradora.' },
  { label: 'Número na Ordem dos Psicólogos Portugueses', description: 'Inscrição na OPP, quando aplicável à colaboração prevista.' },
  { label: 'Âmbito concreto da colaboração', description: 'Definição clara do que a colaboração abrange e do que não abrange.' },
  { label: 'Responsabilidades', description: 'Atribuições específicas dentro do processo de matchmaking.' },
  { label: 'Procedimentos de encaminhamento', description: 'Como e quando um candidato é encaminhado, com consentimento adequado.' },
  { label: 'Limites de acesso aos dados', description: 'Acesso estritamente limitado ao necessário para a intervenção prevista.' },
  { label: 'Regras de confidencialidade', description: 'Compromissos de discrição proporcionais à intervenção.' },
  { label: 'Documentos de informação e consentimento', description: 'Informação e consentimento adequados, específicos e informados.' },
];

export const psychologistGuardrails: string[] = [
  'Não criar perfis fictícios de profissionais.',
  'Não anunciar avaliações psicológicas, testes clínicos ou certificações ainda inexistentes.',
  'Qualquer intervenção psicológica será definida e realizada exclusivamente por profissionais habilitados, respeitando as normas profissionais e legais aplicáveis.',
];
