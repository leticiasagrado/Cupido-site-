export type TrustPillar = {
  index: string;
  title: string;
  summary: string;
  detail: string;
};

export const trustPillars: TrustPillar[] = [
  {
    index: '01',
    title: 'Confidencialidade',
    summary: 'Discrição em cada passo. Sem exposição pública.',
    detail:
      'Os nossos clientes não são expostos publicamente. Não existe catálogo de membros, nem perfis públicos, nem pesquisa aberta. A informação é partilhada de forma gradual e apenas quando existe interesse numa potencial apresentação. O que nos confia fica entre si e a equipa.',
  },
  {
    index: '02',
    title: 'Verificação',
    summary: 'Identidade e autenticidade confirmadas com cuidado.',
    detail:
      'Antes de qualquer apresentação, procuramos confirmar a identidade e a autenticidade das pessoas envolvidas. A maioridade é verificada no primeiro contacto e a informação relevante é confirmada ao longo do processo. Nada é tomado por garantido.',
  },
  {
    index: '03',
    title: 'Consentimento mútuo',
    summary: 'Nenhuma apresentação sem um “sim” de ambos os lados.',
    detail:
      'Nenhuma apresentação acontece sem o interesse e o consentimento explícito de ambas as pessoas. A informação é partilhada gradualmente e cada passo depende de uma decisão consciente de ambos os lados. O respeito pelo tempo e pela vontade de cada pessoa é inegociável.',
  },
  {
    index: '04',
    title: 'Protecção dos dados',
    summary: 'Os seus dados, tratados de acordo com o RGPD.',
    detail:
      'Tratamos os seus dados de acordo com o Regulamento Geral de Protecção de Dados (RGPD). Pode aceder, rectificar, limitar ou solicitar o apagamento dos seus dados a qualquer momento e retirar o consentimento sem afectar o tratamento já efectuado. A política completa está disponível na página de Privacidade.',
  },
];
