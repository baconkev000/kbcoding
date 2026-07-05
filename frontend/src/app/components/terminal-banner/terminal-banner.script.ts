export interface TerminalScriptStep {
  text: string;
  delayMs?: number;
  pauseAfterMs?: number;
}

export const TERMINAL_BANNER_SCRIPT: TerminalScriptStep[] = [
  { text: '$ npm run portfolio', delayMs: 55, pauseAfterMs: 500 },
  { text: '', delayMs: 0, pauseAfterMs: 150 },
  { text: 'Compiling Kevin Bacon...', delayMs: 35, pauseAfterMs: 450 },
  { text: '', delayMs: 0, pauseAfterMs: 150 },
  { text: '✓ Software Engineer', delayMs: 22, pauseAfterMs: 120 },
  { text: '✓ Startup Founder', delayMs: 22, pauseAfterMs: 120 },
  { text: '✓ Game Developer', delayMs: 22, pauseAfterMs: 120 },
  { text: '✓ Creative Problem Solver', delayMs: 22, pauseAfterMs: 350 },
  { text: '', delayMs: 0, pauseAfterMs: 150 },
  { text: 'Build completed successfully.', delayMs: 28, pauseAfterMs: 400 },
  { text: '', delayMs: 0, pauseAfterMs: 150 },
  { text: 'Portfolio ready.', delayMs: 35, pauseAfterMs: 3000 },
];
