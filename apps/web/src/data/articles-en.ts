export type EnArticleSection = { heading: string; paragraphs: string[] };
export type EnArticle = {
  slug: string; title: string; excerpt: string; category: string;
  date: string; isoDate: string; readingTime: string; body: EnArticleSection[];
};

export const enArticles: EnArticle[] = [
  {
    slug: 'como-funciona-o-matchmaking-privado',
    title: 'How private matchmaking works',
    excerpt: 'Behind the concept lies a human, step-by-step process made of listening, curation and consent — not algorithms or public profiles.',
    category: 'THE PROCESS',
    date: 'October 2026',
    isoDate: '2026-10-01',
    readingTime: '5 min read',
    body: [
      { heading: 'There is no algorithm. There is a conversation.', paragraphs: ['Private matchmaking begins where apps end: in a real conversation, with time to listen. Before any search, we get to know the person — their moment in life, their values, what they are truly looking for and what they no longer want.', 'There is no public profile, no member catalogue to scroll through. Relevant information is organised internally and shared gradually, only when it makes sense and only with the consent of both parties.'] },
      { heading: 'Curation, not quantity', paragraphs: ['The service does not promise a fixed number of dates per month. An introduction only happens when we identify real compatibility and there is mutual interest. What we are paid for is the search, the human curation and the guidance — not a guaranteed romantic outcome.', 'This means we may search within our network, conduct active search outside it, or, in the case of Bespoke Private Search, build a tailored strategy, national or international.'] },
      { heading: 'Consent at every step', paragraphs: ['No one is introduced without your consent. Before any introduction, we confirm the interest of both parties and share the context needed for the first contact to happen with ease.', 'After the date, we hear about your experience in private. That feedback helps us refine the search or accompany the evolution of a new connection. The process is continuous, not a single transaction.'] },
      { heading: 'No mandatory lock-in', paragraphs: ['All services run month to month. There are no 3, 6 or 12-month contracts tying you down. Start, renewal and termination conditions are explained before hiring, which takes place outside this website, in a conversation — not a form.'] },
    ],
  },
  {
    slug: 'dating-apps-vs-matchmaking',
    title: 'Dating apps vs matchmaking',
    excerpt: 'Apps have become a second job for many. Private matchmaking proposes the opposite: less wasted time, more intention, and a human intermediary who filters the noise.',
    category: 'REFLECTION',
    date: 'October 2026',
    isoDate: '2026-10-01',
    readingTime: '6 min read',
    body: [
      { heading: 'The promise and the fatigue', paragraphs: ['Dating apps promise abundance: thousands of profiles a tap away. In practice, that abundance has turned, for many, into fatigue — conversations that lead nowhere, dates without compatibility and the feeling that looking for someone has become a second job.', 'The problem is rarely a lack of people. It is a lack of intention, of context, and of a human filter that does the work before the date.'] },
      { heading: 'Where the difference lies', paragraphs: ['An app shows profiles. A matchmaker knows people. In private matchmaking, someone listens to your story, understands what you are looking for, searches for you and only introduces a person when there is a real reason to do so.', 'There is no swiping, no public exposure, no algorithm deciding for you. There is a human intermediary who takes on the time-consuming part — the search, the screening, the mutual-interest check — so your time is spent on dates with intention.'] },
      { heading: 'Privacy as part of the service', paragraphs: ['On apps, your profile is a public product. In private matchmaking, your profile is internal and confidential. There is no member catalogue. Information is shared gradually and only with your consent.', 'For many people — professionals, entrepreneurs, parents, those who have been through a divorce — that discretion is not a luxury. It is a condition.'] },
      { heading: 'It is not for everyone — and that is fine', paragraphs: ['Private matchmaking is not the right answer for those seeking casual dates or the thrill of algorithmic serendipity. It is for those who value time, privacy and meaningful relationships, and are willing to let someone search for them with criteria.', 'The fundamental difference is not in technology. It is in intention: less chance, more intention.'] },
    ],
  },
  {
    slug: 'como-saber-o-que-realmente-procura-numa-relacao',
    title: 'How to know what you really want in a relationship',
    excerpt: 'Before looking for someone, it is worth understanding what you are looking for. Four simple questions to move from a list of criteria to intention.',
    category: 'SELF-KNOWLEDGE',
    date: 'October 2026',
    isoDate: '2026-10-01',
    readingTime: '5 min read',
    body: [
      { heading: 'The list and the intention', paragraphs: ['Many people arrive at matchmaking with a list: age, profession, height, city. Those criteria have their place, but they rarely explain why a relationship works — or why so many "right on paper" introductions lead nowhere.', 'What is usually missing is not a longer list. It is clarity about intention: what kind of life you want to share, which values are non-negotiable, what pace of relationship makes sense right now.'] },
      { heading: 'Four questions that help', paragraphs: ['Rather than starting with what the other person should be, start with yourself. These four questions are a starting point — not a test:', '1. What kind of day-to-day do I want to share? A relationship is lived on ordinary days, not only in big moments.', '2. What am I no longer willing to compromise on? Knowing your limits is as important as knowing your desires.', '3. Which values need to be aligned? Honesty, family, autonomy, presence — values sustain the relationship when novelty fades.', '4. What pace makes sense now? Not everyone is looking for the same thing at the same time. The moment in life matters.'] },
      { heading: 'The difference between preference and need', paragraphs: ['A preference is something that would make the relationship more pleasant. A need is something without which the relationship does not work. Confusing the two leads to rejecting the right people for the wrong reasons — or to insisting on the wrong people for the right reasons.', 'Part of our work is helping make that distinction. We do not decide for you, but we ask the questions that help clarify what is essential and what is simply preferable.'] },
      { heading: 'Searching with intention', paragraphs: ['Knowing what you are looking for does not mean closing yourself off to surprises. It means searching with intention, while remaining open to the right person, even when they do not match the initial picture.', 'It is that combination — clarity about the essential, openness to the unexpected — that makes a human search more effective than a thousand profiles. And that is what we believe in, at The Cupid Bureau.'] },
    ],
  },
];

export function getEnArticle(slug: string): EnArticle | undefined {
  return enArticles.find((article) => article.slug === slug);
}
