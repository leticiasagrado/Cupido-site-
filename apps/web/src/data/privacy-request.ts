export type PrivacyRequestType =
  | 'acesso'
  | 'rectificacao'
  | 'apagamento'
  | 'limitacao'
  | 'portabilidade'
  | 'oposicao'
  | 'retirada-consentimento';

export type PrivacyRequestStatus =
  | 'novo'
  | 'em-tratamento'
  | 'concluido'
  | 'recusado';

export const requestTypeOptions: { value: PrivacyRequestType; label: string; description: string }[] = [
  { value: 'acesso', label: 'Acesso aos dados', description: 'Saber que dados seus possuímos e como são tratados.' },
  { value: 'rectificacao', label: 'Rectificação', description: 'Corrigir dados incompletos ou inaccurate.' },
  { value: 'apagamento', label: 'Apagamento', description: 'Solicitar a eliminação dos seus dados, salvo obrigações legais.' },
  { value: 'limitacao', label: 'Limitação do tratamento', description: 'Restringir o tratamento enquanto um pedido é analisado.' },
  { value: 'portabilidade', label: 'Portabilidade', description: 'Receber os seus dados num formato estruturado, quando aplicável.' },
  { value: 'oposicao', label: 'Oposição', description: 'Opor-se ao tratamento para determinadas finalidades.' },
  { value: 'retirada-consentimento', label: 'Retirada de consentimento', description: 'Retirar um consentimento previamente dado, sem afectar o tratamento já efectuado.' },
];

export const requestStatusLabels: Record<PrivacyRequestStatus, string> = {
  novo: 'Novo',
  'em-tratamento': 'Em tratamento',
  concluido: 'Concluído',
  recusado: 'Recusado',
};

export const requestStatusTone: Record<PrivacyRequestStatus, string> = {
  novo: 'pending',
  'em-tratamento': 'info',
  concluido: 'approved',
  recusado: 'rejected',
};

export const requestTypeLabels: Record<PrivacyRequestType, string> = {
  acesso: 'Acesso aos dados',
  rectificacao: 'Rectificação',
  apagamento: 'Apagamento',
  limitacao: 'Limitação do tratamento',
  portabilidade: 'Portabilidade',
  oposicao: 'Oposição',
  'retirada-consentimento': 'Retirada de consentimento',
};
