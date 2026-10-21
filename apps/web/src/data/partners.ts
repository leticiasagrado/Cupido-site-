export type PartnerType = 'imprensa' | 'parceiro' | 'espaco';

export type PartnerTypeOption = {
  value: PartnerType;
  label: string;
  description: string;
};

export const partnerTypes: PartnerTypeOption[] = [
  {
    value: 'imprensa',
    label: 'Imprensa',
    description: 'Jornalismo, entrevistas, reportagens ou colaborações editoriais sobre matchmaking e relacionamentos.',
  },
  {
    value: 'parceiro',
    label: 'Parceiro / Marca',
    description: 'Marcas que partilham valores de elegância, discrição e cuidado humano e querem associar-se aos nossos eventos ou concierge.',
  },
  {
    value: 'espaco',
    label: 'Espaço / Restaurante / Hotel',
    description: 'Restaurantes, hotéis e espaços que gostariam de acolher encontros e experiências privadas do Bureau.',
  },
];
