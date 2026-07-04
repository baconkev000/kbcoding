import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-member-access',
  templateUrl: './member-access.component.html',
  styleUrls: ['./member-access.component.css'],
})
export class MemberAccessComponent {
  @Input() members: string[] = [];

  private readonly colorClasses = [
    'secondary-accent-color',
    'accent-color',
    'quinary-accent-color',
  ];

  get memberTokens(): { word: string; colorClass: string; showDot: boolean; showParens: boolean }[] {
    const tokens: { word: string; colorClass: string; showDot: boolean; showParens: boolean }[] = [];
    let colorIndex = 0;

    for (const member of this.members) {
      const words = member.split(' ').filter((word) => word.length > 0);
      words.forEach((word, wordIndex) => {
        tokens.push({
          word,
          colorClass: this.colorClasses[colorIndex % this.colorClasses.length],
          showDot: wordIndex < words.length - 1,
          showParens: wordIndex === words.length - 1,
        });
        colorIndex++;
      });
    }

    return tokens;
  }
}
