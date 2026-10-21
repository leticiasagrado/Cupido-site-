export type BureauService = {
  slug: string;
  name: string;
  price: string;
  prefix?: string;
  tagline: string;
  positioning: string;
  description: string;
  ideal: string;
  features: string[];
  cta: string;
  featured?: boolean;
  aspirational?: boolean;
};

export const services: BureauService[] = [
  {
    slug: 'private-matchmaking',
    name: 'Private',
    price: '350',
    tagline: 'Curadoria privada dentro da nossa rede.',
    positioning: 'Conhecemos a nossa rede.',
    description:
      'Para quem procura uma alternativa mais criteriosa às aplicações de encontros e quer conhecer pessoas de forma mais reservada, sem exposição pública. O cliente passa por uma entrevista individual e é criado um perfil confidencial interno. A equipa analisa os membros e candidatos existentes na rede da The Cupid Bureau e procura potenciais compatibilidades de acordo com os critérios definidos.',
    ideal:
      'Quem quer mais privacidade, menos tempo perdido e maior qualidade nas apresentações — uma alternativa mais cuidada às aplicações, sem necessidade de pesquisa externa.',
    features: [
      'Entrevista inicial de perfil',
      'Criação do perfil confidencial',
      'Análise de valores, estilo de vida e expectativas',
      'Pesquisa dentro da rede The Cupid Bureau',
      'Selecção manual de potenciais compatibilidades',
      'Apresentações apenas com interesse mútuo',
      'Mediação inicial do contacto',
      'Feedback após os encontros',
      'Reajuste dos critérios ao longo do processo',
      'Acompanhamento por e-mail ou mensagem',
    ],
    cta: 'Solicitar consulta',
  },
  {
    slug: 'signature',
    name: 'Signature',
    price: '650',
    tagline: 'Pesquisa activa. Uma matchmaker pessoal.',
    positioning: 'Procuramos activamente por si.',
    featured: true,
    description:
      'O nosso acompanhamento mais escolhido. A diferença fundamental é que a agência deixa de esperar que alguém compatível já esteja dentro da base. Nós vamos procurar. Além de tudo o que existe no Private, uma matchmaker acompanha o cliente de forma mais próxima e pode identificar pessoas fora da rede actual, convidá-las para uma conversa e avaliar se existe potencial de compatibilidade.',
    ideal:
      'Quem quer delegar verdadeiramente parte da procura e ter uma profissional a acompanhar todo o processo. A escolha racional — o melhor equilíbrio entre preço e serviço.',
    features: [
      'Tudo o que está incluído no Private',
      'Matchmaker pessoal responsável pelo processo',
      'Pesquisa activa dentro e fora da base',
      'Identificação de potenciais candidatos externos',
      'Abordagem discreta de pessoas seleccionadas',
      'Entrevistas preliminares com candidatos',
      'Prioridade na análise de novas candidaturas',
      'Preparação antes dos encontros',
      'Acompanhamento mais próximo após cada apresentação',
      'Análise de padrões e feedback',
      'Reajuste estratégico contínuo da procura',
      'Maior disponibilidade da equipa para acompanhamento',
    ],
    cta: 'Falar com uma matchmaker',
  },
  {
    slug: 'elite-concierge',
    name: 'Elite Concierge',
    price: '1.200',
    tagline: 'Matchmaking, pesquisa prioritária e gestão da experiência.',
    positioning: 'Procuramos e tratamos da experiência.',
    aspirational: true,
    description:
      'Neste nível, o cliente não está apenas a contratar matchmaking. Está a contratar tempo, conveniência e concierge. A equipa assume uma parte muito maior do processo e reduz ao máximo aquilo que o cliente precisa de organizar. Ideal para empresários, executivos e pessoas com agendas exigentes que preferem delegar o processo.',
    ideal:
      'Quem quer delegar o processo — e não apenas receber ajuda na procura. Para quem o tempo e a conveniência justificam um acompanhamento completo.',
    features: [
      'Tudo o que está incluído no Signature',
      'Prioridade elevada na pesquisa',
      'Maior dedicação de tempo da equipa ao caso',
      'Procura alargada por diferentes redes e contextos',
      'Screening mais aprofundado dos candidatos',
      'Coordenação completa das apresentações',
      'Concierge de encontros',
      'Pesquisa e sugestão de restaurantes ou experiências',
      'Reservas',
      'Coordenação de datas e horários',
      'Apoio de imagem e apresentação pessoal quando necessário',
      'Preparação individual antes de encontros importantes',
      'Procura noutras cidades e pesquisa nacional alargada',
      'Contacto prioritário com a matchmaker',
    ],
    cta: 'Solicitar consulta privada',
  },
  {
    slug: 'bespoke-private-search',
    name: 'Bespoke Private Search',
    price: '2.000',
    prefix: 'A partir de',
    tagline: 'Pesquisa privada totalmente construída à medida.',
    positioning: 'Construímos uma pesquisa exclusivamente à sua medida.',
    description:
      'O serviço de maior exclusividade. Não se vende através de uma simples tabela: o cliente passa primeiro por uma consulta privada, porque cada pesquisa terá uma estratégia própria. Destina-se a pessoas com critérios muito específicos, grande exigência de confidencialidade, mobilidade internacional ou uma rede pessoal/profissional que torne a procura particularmente complexa.',
    ideal:
      'Quem procura uma estratégia altamente personalizada, com critérios específicos ou uma dimensão internacional. Quando o perfil que procura não está simplesmente disponível, vamos procurá-lo.',
    features: [
      'Pode incluir matchmaker dedicada',
      'Estratégia personalizada de pesquisa',
      'Pesquisa activa nacional',
      'Pesquisa internacional',
      'Headhunting directo',
      'Identificação de pessoas fora da base',
      'Abordagem individual e discreta',
      'Entrevistas aprofundadas',
      'Screening personalizado',
      'Critérios específicos de estilo de vida e localização',
      'Pesquisa em diferentes cidades ou países',
      'Concierge completo e organização logística',
      'Prioridade máxima dentro da operação',
      'Protocolos adicionais de confidencialidade',
      'Gestão extremamente reservada do perfil',
      'Pesquisa de candidatos que não estão activamente à procura',
    ],
    cta: 'Solicitar consulta confidencial',
  },
];

export type ComparisonValue = boolean | string;
export type ComparisonRow = {
  label: string;
  values: ComparisonValue[];
};

export const comparisonRows: ComparisonRow[] = [
  { label: 'Perfil confidencial', values: [true, true, true, true] },
  { label: 'Curadoria na rede privada', values: [true, true, true, true] },
  { label: 'Feedback pós-encontro', values: [true, true, true, true] },
  { label: 'Matchmaker pessoal', values: [false, true, true, true] },
  { label: 'Pesquisa activa fora da base', values: [false, true, true, true] },
  { label: 'Abordagem de candidatos externos', values: [false, true, true, true] },
  { label: 'Prioridade na pesquisa', values: [false, true, 'Alta', 'Máxima'] },
  { label: 'Concierge de encontros', values: [false, false, true, true] },
  { label: 'Reservas e logística', values: [false, false, true, true] },
  { label: 'Pesquisa nacional alargada', values: [false, 'opcional', true, true] },
  { label: 'Pesquisa internacional', values: [false, false, 'opcional', true] },
  { label: 'Headhunting dedicado', values: [false, false, false, true] },
  { label: 'Estratégia totalmente personalizada', values: [false, false, false, true] },
];
