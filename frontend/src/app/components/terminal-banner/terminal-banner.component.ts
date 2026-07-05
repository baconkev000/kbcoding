import { Component, OnDestroy, OnInit } from '@angular/core';
import { TERMINAL_BANNER_SCRIPT } from './terminal-banner.script';

@Component({
  selector: 'app-terminal-banner',
  templateUrl: './terminal-banner.component.html',
  styleUrls: ['./terminal-banner.component.css'],
})
export class TerminalBannerComponent implements OnInit, OnDestroy {
  completedLines: string[] = [];
  activeLine = '';
  showCursor = true;

  private stepIndex = 0;
  private charIndex = 0;
  private timeouts: ReturnType<typeof setTimeout>[] = [];
  private cursorInterval?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.cursorInterval = window.setInterval(() => {
      this.showCursor = !this.showCursor;
    }, 530);
    this.startLoop();
  }

  ngOnDestroy(): void {
    this.clearTimeouts();
    if (this.cursorInterval) {
      window.clearInterval(this.cursorInterval);
    }
  }

  isCheckLine(line: string): boolean {
    return line.includes('✓');
  }

  isStatusLine(line: string): boolean {
    return line.includes('Compiling');
  }

  isSuccessLine(line: string): boolean {
    const trimmed = line.trim();
    return trimmed === 'Build completed successfully.' || trimmed === 'Portfolio ready.';
  }

  private startLoop(): void {
    this.completedLines = [];
    this.activeLine = '';
    this.stepIndex = 0;
    this.charIndex = 0;
    this.runCurrentStep();
  }

  private runCurrentStep(): void {
    const step = TERMINAL_BANNER_SCRIPT[this.stepIndex];
    if (!step) {
      this.queueTimeout(() => this.startLoop(), 300);
      return;
    }

    if (step.text.length === 0) {
      this.completedLines.push('');
      this.activeLine = '';
      this.stepIndex++;
      this.charIndex = 0;
      this.queueTimeout(() => this.runCurrentStep(), step.pauseAfterMs ?? 0);
      return;
    }

    if (this.charIndex < step.text.length) {
      this.activeLine += step.text[this.charIndex];
      this.charIndex++;
      this.queueTimeout(() => this.runCurrentStep(), step.delayMs ?? 40);
      return;
    }

    this.completedLines.push(this.activeLine);
    this.activeLine = '';
    this.charIndex = 0;
    this.stepIndex++;
    this.queueTimeout(() => this.runCurrentStep(), step.pauseAfterMs ?? 0);
  }

  private queueTimeout(callback: () => void, delay: number): void {
    const timeout = window.setTimeout(callback, delay);
    this.timeouts.push(timeout);
  }

  private clearTimeouts(): void {
    this.timeouts.forEach((timeout) => window.clearTimeout(timeout));
    this.timeouts = [];
  }
}
