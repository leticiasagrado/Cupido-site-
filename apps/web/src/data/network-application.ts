export type NetworkIntention = 'relacao-seria' | 'conhecer-intencao' | 'a-definir';

export type NetworkStatus = 'pending' | 'approved' | 'rejected' | 'info-requested';

export const intentionOptions: { value: NetworkIntention; label: string }[] = [
  { value: 'relacao-seria', label: 'Uma relação séria e duradoura' },
  { value: 'conhecer-intencao', label: 'Conhecer alguém com intenção e tranquilidade' },
  { value: 'a-definir', label: 'Ainda estou a definir o que procuro' },
];

export const statusLabels: Record<NetworkStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovada',
  rejected: 'Rejeitada',
  'info-requested': 'Informação solicitada',
};

export const statusTone: Record<NetworkStatus, string> = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
  'info-requested': 'info',
};

export const howItWorksSteps = [
  {
    number: '01',
    title: 'Crie o seu perfil',
    description:
      'Partilhe as informações essenciais para iniciar a sua candidatura. É gratuito e confidencial.',
  },
  {
    number: '02',
    title: 'Conhecemos a sua candidatura',
    description:
      'A nossa equipa analisa os dados e poderá solicitar informações adicionais, sempre em privado.',
  },
  {
    number: '03',
    title: 'Quando existir uma possibilidade',
    description:
      'Poderemos entrar em contacto caso surja uma potencial compatibilidade, sempre respeitando o interesse mútuo.',
  },
];

export const photoLimits = {
  maxFiles: 3,
  maxBytes: 5 * 1024 * 1024,
  accept: 'image/jpeg,image/png,image/webp',
};
