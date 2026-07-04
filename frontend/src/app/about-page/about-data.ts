export interface SkillEntry {
  name: string;
  percent: number;
}

export interface SkillsList {
  languages: SkillEntry[];
  frameworks: SkillEntry[];
  libraries: SkillEntry[];
  tools: SkillEntry[];
}

function toEntries(items: [string, number][]): SkillEntry[] {
  return items.map(([name, percent]) => ({ name, percent }));
}

export const SKILLS_LIST: SkillsList = {
  languages: toEntries([
    ['Python', 80],
    ['JavaScript', 90],
    ['TypeScript', 75],
    ['Java', 40],
    ['Ruby', 50],
    ['SQL', 70],
    ['HTML', 100],
    ['CSS', 100],
  ]),
  frameworks: toEntries([
    ['Django', 85],
    ['Angular', 65],
    ['Vue', 80],
    ['NextJs', 65],
    ['NuxtJs', 60],
    ['Ruby On Rails', 50],
    ['React-Native', 80],
    ['Flutter', 70],
  ]),
  libraries: toEntries([
    ['React', 80],
    ['HTMX', 70],
    ['GSAP', 60],
  ]),
  tools: toEntries([
    ['Git', 80],
    ['Docker', 70],
    ['Postman-Insomnia', 70],
  ]),
};

export const ABOUT_HOBBIES = [
  'basketball',
  'golf',
  'bowling',
  'weight_lifting',
  'art',
  'playing_bass_guitar',
  'coding',
  'learning',
  '...',
];

export const ABOUT_EXPERIENCE = {
  years: '10+',
  specialties: [
    'Full Stack Development',
    'Product Architecture',
    'AI Applications',
    'Web & Mobile',
    'Startup Engineering',
  ],
};
