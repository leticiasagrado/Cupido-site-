/**
 * The Cupid Academy — catalogue from the business plan. Prices and durations
 * are initial proposals, to be validated with the waiting list before launch.
 */
export type AcademyItemId =
  | 'confianca-para-amar'
  | 'arte-de-criar-conexoes'
  | 'first-date-confidence'
  | 'recomecar-no-amor'
  | 'amar-depois-dos-40'
  | 'dating-with-intention'
  | 'ebook-50-perguntas'
  | 'guia-primeiro-encontro'
  | 'workshop-comunicacao'
  | 'mini-curso-autoestima'
  | 'workshop-grupo'
  | 'sessao-individual'
  | 'todos';

type Text = { pt: string; en: string };

export type AcademyCourse = {
  id: AcademyItemId;
  category: Text;
  name: Text;
  description: Text;
  format: Text;
  price: Text;
  featured?: boolean;
};

export type AcademyProduct = { id: AcademyItemId; name: Text; price: Text };

export const academyCourses: AcademyCourse[] = [
  {
    id: 'confianca-para-amar',
    category: { pt: 'Autoconhecimento', en: 'Self-knowledge' },
    name: { pt: 'Confiança para Amar', en: 'Confidence to Love' },
    description: {
      pt: 'Autoestima, insegurança, autoconhecimento, limites pessoais e confiança nos encontros.',
      en: 'Self-esteem, insecurity, self-knowledge, personal boundaries and confidence on dates.',
    },
    format: { pt: '6 aulas · 2 horas', en: '6 lessons · 2 hours' },
    price: { pt: '39 €', en: '€39' },
  },
  {
    id: 'arte-de-criar-conexoes',
    category: { pt: 'Relacionamento', en: 'Relationships' },
    name: { pt: 'A Arte de Criar Conexões', en: 'The Art of Building Connections' },
    description: {
      pt: 'Como iniciar conversas, demonstrar interesse, criar proximidade e comunicar com autenticidade.',
      en: 'How to start conversations, show interest, build closeness and communicate authentically.',
    },
    format: { pt: '8 aulas · 3 horas', en: '8 lessons · 3 hours' },
    price: { pt: '49 €', en: '€49' },
  },
  {
    id: 'first-date-confidence',
    category: { pt: 'Encontros', en: 'Dating' },
    name: { pt: 'First Date Confidence', en: 'First Date Confidence' },
    description: {
      pt: 'Preparação para o primeiro encontro, linguagem corporal, conversa, nervosismo e expectativas realistas.',
      en: 'Preparing for a first date: body language, conversation, nerves and realistic expectations.',
    },
    format: { pt: '5 aulas · 90 minutos', en: '5 lessons · 90 minutes' },
    price: { pt: '29 €', en: '€29' },
  },
  {
    id: 'recomecar-no-amor',
    category: { pt: 'Desenvolvimento pessoal', en: 'Personal growth' },
    name: { pt: 'Recomeçar no Amor', en: 'Starting Again in Love' },
    description: {
      pt: 'Reflexão após o fim de uma relação, identificação de padrões, reconstrução de rotinas e abertura a novas experiências.',
      en: 'Reflecting after a relationship ends, recognising patterns, rebuilding routines and opening up to new experiences.',
    },
    format: { pt: '8 aulas · 3 horas', en: '8 lessons · 3 hours' },
    price: { pt: '59 €', en: '€59' },
  },
  {
    id: 'amar-depois-dos-40',
    category: { pt: 'Amor e maturidade', en: 'Love and maturity' },
    name: { pt: 'Amar Depois dos 40', en: 'Love After 40' },
    description: {
      pt: 'Novas relações na maturidade, expectativas, filhos, independência, intimidade e comunicação.',
      en: 'New relationships later in life: expectations, children, independence, intimacy and communication.',
    },
    format: { pt: '7 aulas · 2h30', en: '7 lessons · 2h30' },
    price: { pt: '49 €', en: '€49' },
  },
  {
    id: 'dating-with-intention',
    category: { pt: 'Experiência premium', en: 'Premium experience' },
    name: { pt: 'Dating with Intention', en: 'Dating with Intention' },
    description: {
      pt: 'Definir objectivos relacionais, reconhecer compatibilidades, comunicar valores e gerir a procura de uma relação.',
      en: 'Defining relationship goals, recognising compatibility, communicating values and managing the search for a relationship.',
    },
    format: { pt: '10 aulas · 4 horas', en: '10 lessons · 4 hours' },
    price: { pt: '89 €', en: '€89' },
    featured: true,
  },
];

export const academyProducts: AcademyProduct[] = [
  { id: 'ebook-50-perguntas', name: { pt: 'E-book: 50 perguntas para conhecer alguém melhor', en: 'E-book: 50 questions to get to know someone better' }, price: { pt: '9 €', en: '€9' } },
  { id: 'guia-primeiro-encontro', name: { pt: 'Guia digital para o primeiro encontro', en: 'Digital guide to the first date' }, price: { pt: '12 €', en: '€12' } },
  { id: 'workshop-comunicacao', name: { pt: 'Workshop ao vivo de comunicação afectiva', en: 'Live workshop on affectionate communication' }, price: { pt: '19 €', en: '€19' } },
  { id: 'mini-curso-autoestima', name: { pt: 'Mini-curso de autoestima e confiança', en: 'Mini-course on self-esteem and confidence' }, price: { pt: '24 €', en: '€24' } },
  { id: 'workshop-grupo', name: { pt: 'Workshop em grupo com especialista', en: 'Group workshop with a specialist' }, price: { pt: '49–99 €', en: '€49–99' } },
  { id: 'sessao-individual', name: { pt: 'Sessão individual de orientação relacional', en: 'One-to-one relationship guidance session' }, price: { pt: 'Sob orçamento', en: 'On request' } },
];
