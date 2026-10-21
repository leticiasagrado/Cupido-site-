export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readingTime: string;
  body: ArticleSection[];
};

export const articles: Article[] = [
  {
    slug: 'como-funciona-o-matchmaking-privado',
    title: 'Como funciona o matchmaking privado',
    excerpt: 'Para trás do conceito existe um processo humano, passo a passo, feito de escuta, curadoria e consentimento — não de algoritmos nem de perfis públicos.',
    category: 'O PROCESSO',
    date: 'Outubro 2026',
    isoDate: '2026-10-01',
    readingTime: '5 min de leitura',
    body: [
      {
        heading: 'Não há algoritmo. Há uma conversa.',
        paragraphs: [
          'O matchmaking privado começa onde as aplicações terminam: numa conversa real, com tempo para ouvir. Antes de qualquer procura, conhecemos a pessoa — o seu momento de vida, os seus valores, o que realmente procura e o que já não procura.',
          'Não existe um perfil público, nem um catálogo de membros para percorrer. A informação relevante é organizada internamente e partilhada de forma gradual, apenas quando faz sentido e apenas com o consentimento de ambas as partes.',
        ],
      },
      {
        heading: 'Curadoria, não quantidade',
        paragraphs: [
          'O serviço não promete um número fixo de encontros por mês. Uma apresentação só acontece quando identificamos compatibilidade real e existe interesse mútuo. O que remuneramos é a pesquisa, a curadoria humana e o acompanhamento — não um resultado afectivo garantido.',
          'Isto significa que podemos procurar dentro da nossa rede, realizar pesquisa activa fora dela, ou, no caso do Bespoke Private Search, construir uma estratégia à medida, nacional ou internacional.',
        ],
      },
      {
        heading: 'Consentimento em cada passo',
        paragraphs: [
          'Nenhuma pessoa é apresentada sem o seu consentimento. Antes de qualquer apresentação, confirmamos o interesse das duas partes e partilhamos o contexto necessário para que o primeiro contacto aconteça com tranquilidade.',
          'Depois do encontro, ouvimos a sua experiência em privado. Esse feedback ajuda-nos a afinar a procura ou a acompanhar a evolução de uma nova ligação. O processo é contínuo, não uma transação única.',
        ],
      },
      {
        heading: 'Sem fidelização obrigatória',
        paragraphs: [
          'Todos os serviços funcionam mês a mês. Não há contratos de 3, 6 ou 12 meses que o prendam. As condições de início, renovação e cessação são explicadas antes da contratação, que acontece fora deste website, numa conversa — não num formulário.',
        ],
      },
    ],
  },
  {
    slug: 'dating-apps-vs-matchmaking',
    title: 'Dating apps vs matchmaking',
    excerpt: 'As aplicações tornaram-se um segundo emprego para muitos. O matchmaking privado propõe o oposto: menos tempo perdido, mais intenção e um intermediário humano que filtra o ruído.',
    category: 'REFLEXÃO',
    date: 'Outubro 2026',
    isoDate: '2026-10-01',
    readingTime: '6 min de leitura',
    body: [
      {
        heading: 'A promessa e o cansaço',
        paragraphs: [
          'As aplicações de encontros prometem abundância: milhares de perfis a um toque de distância. Na prática, essa abundância transformou-se, para muitos, em cansaço — conversas que não levam a lado nenhum, encontros sem compatibilidade e a sensação de que procurar alguém se tornou um segundo emprego.',
          'O problema raramente é a falta de pessoas. É a falta de intenção, de contexto e de um filtro humano que faça o trabalho antes do encontro.',
        ],
      },
      {
        heading: 'Onde está a diferença',
        paragraphs: [
          'Uma aplicação mostra perfis. Um matchmaker conhece pessoas. No matchmaking privado, alguém ouve a sua história, percebe o que procura, procura por si e só apresenta uma pessoa quando existe um motivo real para o fazer.',
          'Não há swipe, não há exposição pública, não há um algoritmo a decidir por si. Há um intermediário humano que assume a parte demorada — a pesquisa, a triagem, a verificação do interesse mútuo — para que o seu tempo seja gasto em encontros com intenção.',
        ],
      },
      {
        heading: 'Privacidade como parte do serviço',
        paragraphs: [
          'Nas aplicações, o seu perfil é um produto público. No matchmaking privado, o seu perfil é interno e confidencial. Não existe um catálogo de membros. A informação é partilhada gradualmente e apenas com o seu consentimento.',
          'Para muitas pessoas — profissionais, empresários, pais, quem já passou por um divórcio — essa discrição não é um luxo. É uma condição.',
        ],
      },
      {
        heading: 'Não é para todos — e tudo bem',
        paragraphs: [
          'O matchmaking privado não é a resposta certa para quem procura encontros casuais ou a emoção do imprevisto algorítmico. É para quem valoriza o tempo, a privacidade e relações significativas, e está disposto a deixar alguém procurar por si com critério.',
          'A diferença fundamental não está na tecnologia. Está na intenção: menos acaso, mais intenção.',
        ],
      },
    ],
  },
  {
    slug: 'como-saber-o-que-realmente-procura-numa-relacao',
    title: 'Como saber o que realmente procura numa relação',
    excerpt: 'Antes de procurar alguém, vale a pena perceber o que se procura. Quatro perguntas simples para sair da lista de critérios e chegar à intenção.',
    category: 'AUTOCONHECIMENTO',
    date: 'Outubro 2026',
    isoDate: '2026-10-01',
    readingTime: '5 min de leitura',
    body: [
      {
        heading: 'A lista e a intenção',
        paragraphs: [
          'Muitas pessoas chegam ao matchmaking com uma lista: idade, profissão, altura, cidade. Esses critérios têm o seu lugar, mas raramente explicam porque é que uma relação funciona — ou porque é que tantas apresentações «no papel certas» não levam a lado nenhum.',
          'O que costuma faltar não é uma lista mais longa. É clareza sobre a intenção: que tipo de vida se quer partilhar, que valores são inegociáveis, que ritmo de relação faz sentido neste momento.',
        ],
      },
      {
        heading: 'Quatro perguntas que ajudam',
        paragraphs: [
          'Em vez de começar pelo que a outra pessoa deve ser, comece por si. Estas quatro perguntas são um ponto de partida — não um teste:',
          '1. Que tipo de dia-a-dia quero partilhar? A relação vive-se nos dias normais, não apenas nos grandes momentos.',
          '2. O que já não estou disposto a comprometer? Saber os limites é tão importante como saber os desejos.',
          '3. Que valores precisam de estar alinhados? Honestidade, família, autonomia, presença — os valores sustentam a relação quando a novidade passa.',
          '4. Que ritmo faz sentido agora? Nem toda a pessoa procura a mesma coisa ao mesmo tempo. O momento de vida importa.',
        ],
      },
      {
        heading: 'A diferença entre preferência e necessidade',
        paragraphs: [
          'Uma preferência é algo que tornaria a relação mais agradável. Uma necessidade é algo sem o qual a relação não funciona. Confundir as duas leva a rejeitar pessoas certas por motivos errados — ou a insistir em pessoas erradas por motivos certos.',
          'Parte do nosso trabalho é ajudar a fazer essa distinção. Não decidimos por si, mas fazemos as perguntas que ajudam a clarificar o que é essencial e o que é, simplesmente, preferível.',
        ],
      },
      {
        heading: 'Procurar com intenção',
        paragraphs: [
          'Saber o que se procura não significa fechar-se a surpresas. Significa procurar com intenção, mas permanecer aberto à pessoa certa, mesmo quando ela não corresponde à imagem inicial.',
          'É essa combinação — clareza sobre o essencial, abertura ao imprevisto — que torna uma procura humana mais eficaz do que mil perfis. E é nisso que acreditamos, na The Cupid Bureau.',
        ],
      },
    ],
  },
];

export function getArticle(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
