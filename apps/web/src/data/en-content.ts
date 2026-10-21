export type EnService = {
  slug: string;
  name: string;
  price: string;
  prefix?: string;
  tagline: string;
  positioning: string;
  description: string;
  ideal: string;
  features: string[];
  featured?: boolean;
  aspirational?: boolean;
};

export const enServices: EnService[] = [
  {
    slug: 'private-matchmaking',
    name: 'Private',
    price: '350',
    tagline: 'Private curation within our network.',
    positioning: 'We know our network.',
    description: 'For those seeking a more discerning alternative to dating apps who want to meet people more discreetly, with no public exposure. You go through an individual interview and a confidential internal profile is created. The team analyses existing members and candidates within the The Cupid Bureau network and looks for potential compatibility according to your criteria.',
    ideal: 'For those who want more privacy, less time wasted and higher quality introductions — a more caring alternative to apps, with no need for external search.',
    features: ['Initial profile interview', 'Confidential profile creation', 'Analysis of values, lifestyle and expectations', 'Search within the The Cupid Bureau network', 'Manual selection of potential matches', 'Introductions only with mutual interest', 'First-contact mediation', 'Post-date feedback', 'Continuous criteria refinement', 'Email or message guidance'],
  },
  {
    slug: 'signature',
    name: 'Signature',
    price: '650',
    tagline: 'Active search. A personal matchmaker.',
    positioning: 'We actively search for you.',
    featured: true,
    description: 'Our most chosen level of guidance. The fundamental difference is that the agency no longer waits for someone compatible to already be in the network. We go and look. Beyond everything in Private, a matchmaker guides you more closely and can identify people outside the existing network, invite them for a conversation and assess whether there is potential for compatibility.',
    ideal: 'For those who want to truly delegate part of the search and have a professional guiding the entire process. The rational choice — the best balance of price and service.',
    features: ['Everything included in Private', 'Personal matchmaker responsible for the process', 'Active search within and outside the network', 'Identifying potential external candidates', 'Discreet approach to selected people', 'Preliminary interviews with candidates', 'Priority on new applications', 'Pre-date preparation', 'Closer guidance after each introduction', 'Pattern and feedback analysis', 'Continuous strategic refinement', 'Greater team availability for guidance'],
  },
  {
    slug: 'elite-concierge',
    name: 'Elite Concierge',
    price: '1.200',
    tagline: 'Matchmaking, priority search and experience management.',
    positioning: 'We search and handle the experience.',
    aspirational: true,
    description: 'At this level, you are not just hiring matchmaking. You are hiring time, convenience and concierge. The team takes on a much larger share of the process and reduces to a minimum what you need to arrange. Ideal for entrepreneurs, executives and people with demanding schedules who prefer to delegate the process.',
    ideal: 'For those who want to delegate the process — not just receive help with the search. For whom time and convenience justify a complete service.',
    features: ['Everything included in Signature', 'High search priority', 'Greater team time dedicated to your case', 'Extended search across networks and contexts', 'More in-depth candidate screening', 'Complete introduction coordination', 'Date concierge', 'Restaurant and experience research and suggestions', 'Reservations', 'Date and schedule coordination', 'Image and presentation support when needed', 'Individual preparation before important dates', 'Search in other cities and extended national search', 'Priority contact with the matchmaker'],
  },
  {
    slug: 'bespoke-private-search',
    name: 'Bespoke Private Search',
    price: '2.000',
    prefix: 'From',
    tagline: 'A private search built entirely around you.',
    positioning: 'We build a search exclusively tailored to you.',
    description: 'Our most exclusive service. It is not sold through a simple table: you first go through a private consultation, because each search has its own strategy. For people with very specific criteria, a high demand for confidentiality, international mobility or a personal/professional network that makes the search particularly complex.',
    ideal: 'For those seeking a highly personalised strategy, with specific criteria or an international dimension. When the profile you are looking for is not simply available, we go and find it.',
    features: ['May include a dedicated matchmaker', 'Personalised search strategy', 'Active national search', 'International search', 'Direct headhunting', 'Identifying people outside the network', 'Individual, discreet approach', 'In-depth interviews', 'Personalised screening', 'Specific lifestyle and location criteria', 'Search across different cities or countries', 'Full concierge and logistics', 'Maximum priority within the operation', 'Additional confidentiality protocols', 'Extremely reserved profile management', 'Search for candidates not actively seeking matchmaking'],
  },
];

export type EnComparisonValue = boolean | string;
export type EnComparisonRow = {
  label: string;
  values: EnComparisonValue[];
};

export const enComparisonRows: EnComparisonRow[] = [
  { label: 'Confidential profile', values: [true, true, true, true] },
  { label: 'Curation within the private network', values: [true, true, true, true] },
  { label: 'Post-date feedback', values: [true, true, true, true] },
  { label: 'Personal matchmaker', values: [false, true, true, true] },
  { label: 'Active search outside the network', values: [false, true, true, true] },
  { label: 'Approaching external candidates', values: [false, true, true, true] },
  { label: 'Search priority', values: [false, true, 'High', 'Maximum'] },
  { label: 'Date concierge', values: [false, false, true, true] },
  { label: 'Reservations and logistics', values: [false, false, true, true] },
  { label: 'Extended national search', values: [false, 'optional', true, true] },
  { label: 'International search', values: [false, false, 'optional', true] },
  { label: 'Dedicated headhunting', values: [false, false, false, true] },
  { label: 'Fully personalised strategy', values: [false, false, false, true] },
];

export const enFaqs = [
  { question: 'Is The Cupid Bureau a dating app?', answer: 'No. We are a private matchmaking and relationship agency. There is no swiping, no public access to profiles, and no algorithm deciding for you. Every application and potential introduction is reviewed by people.' },
  { question: 'How does the private consultation work?', answer: 'It is a confidential conversation to understand your moment in life, what you are looking for, and to explain the different levels of guidance. You can request a consultation through the form. The team will contact you to arrange availability; the request does not constitute a confirmed booking.' },
  { question: 'Is my profile visible to other clients?', answer: 'No. Your profile is internal and confidential. There is no member catalogue. Relevant information is shared gradually in a potential introduction and only with your consent.' },
  { question: 'Is there a guaranteed number of dates per month?', answer: 'We do not work by quantity. An introduction only happens when we identify compatibility and there is mutual interest. The service rewards the search, the curation and the guidance — not a fixed number of dates or a guaranteed romantic outcome.' },
  { question: 'Is there a mandatory lock-in?', answer: 'No. All services run month to month, with no mandatory 3, 6 or 12-month commitment. Start, renewal and termination conditions are explained before hiring, which takes place outside this website.' },
  { question: 'What is the difference between Private and Signature?', answer: 'Private focuses on curation within our network. Signature adds a personal matchmaker, active search outside the network, pre-interviews and closer individual guidance.' },
  { question: 'Do you do international search?', answer: 'National or international search can be part of Bespoke Private Search. Geography and feasibility are assessed in consultation and defined in an individual proposal.' },
  { question: 'Do I need to hire a service to apply?', answer: 'No. Applying is a first contact, not a purchase or a hiring obligation. The team reviews each application and speaks with you about next steps.' },
  { question: 'Can an introduction happen without my consent?', answer: 'No. No one is introduced without consent. We confirm the interest of both parties before proceeding.' },
  { question: 'Who is this service for?', answer: 'For adults who value time, privacy and meaningful relationships. Our care is personalised; we do not classify people by status or income.' },
  { question: 'Do you work with people of all orientations and family situations?', answer: 'Yes. We welcome adults of all sexual and gender orientations, civil statuses and family situations, including people with children. Compatibility is assessed person to person, with respect and without discrimination. The only condition is being 18 or older and sharing a genuine intention to meet someone seriously.' },
  { question: 'How do private events work?', answer: 'They are small-scale experiences, with carefully selected participants and settings conducive to natural conversation. You can express interest through the application. Dates and conditions are communicated individually when a suitable event exists.' },
  { question: 'Can I hire or pay on the website?', answer: 'No. This website presents the services and receives applications and contact requests. Hiring, any confirmed bookings and payments are handled directly with the team, outside the website.' },
  { question: 'Can I join for free?', answer: 'Yes. The Free Private Network lets you submit an application with no monthly fee.' },
  { question: 'Does free registration guarantee introductions?', answer: 'No. The team may contact you if a potential compatibility arises.' },
  { question: 'What is the difference between the free network and the paid services?', answer: 'The paid services include specific levels of active search, curation and guidance, depending on the plan.' },
  { question: 'Are my details and photos public?', answer: 'There is no public catalogue of candidates. Details and photos are handled in accordance with the Privacy Policy and the applicable authorisations.' },
  { question: 'Do the services guarantee that I will find a relationship?', answer: 'No. The Cupid Bureau provides professional matchmaking services, but cannot guarantee the feelings, decisions or romantic outcomes of third parties.' },
  { question: 'How does the Founding Members offer work?', answer: 'During the launch period, eligible clients may benefit from 15% off the first month of the paid plans. On renewal, the regular price previously communicated and accepted applies.' },
  { question: 'Does the discount continue in the following months?', answer: 'No. The discount applies exclusively to the first month of hiring covered by the campaign.' },
];

export const enNavigation = [
  { label: 'About', href: '/en/about' },
  { label: 'How it works', href: '/en/how-it-works' },
  { label: 'Services', href: '/en/services' },
  { label: 'Private network', href: '/en/private-network' },
  { label: 'Journal', href: '/en/journal' },
  { label: 'Trust', href: '/en/trust-privacy' },
  { label: 'FAQ', href: '/en/faq' },
];
