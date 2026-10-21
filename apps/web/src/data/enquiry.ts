export type EnquiryPath = 'contratar' | 'rede-privada';

export type EnquiryPathOption = {
  value: EnquiryPath;
  label: string;
  description: string;
};

export const enquiryPaths: EnquiryPathOption[] = [
  {
    value: 'contratar',
    label: 'Quero contratar a The Cupid Bureau',
    description:
      'Procuro um serviço de matchmaking privado, com curadoria humana, pesquisa e acompanhamento personalizado.',
  },
  {
    value: 'rede-privada',
    label: 'Quero integrar a rede privada',
    description:
      'Não pretendo contratar um serviço de matchmaking, mas estou disponível para uma eventual apresentação a um cliente compatível.',
  },
];

export const ageRanges = [
  { value: '18-29', label: '18 – 29 anos' },
  { value: '30-39', label: '30 – 39 anos' },
  { value: '40-49', label: '40 – 49 anos' },
  { value: '50-59', label: '50 – 59 anos' },
  { value: '60-mais', label: '60 anos ou mais' },
];

export const situations = [
  { value: 'solteiro', label: 'Solteiro/a' },
  { value: 'divorciado', label: 'Divorciado/a' },
  { value: 'viuvo', label: 'Viúvo/a' },
];

export const scopes = [
  { value: 'cidade', label: 'Na minha cidade' },
  { value: 'portugal', label: 'Em Portugal' },
  { value: 'internacional', label: 'Internacionalmente' },
];
