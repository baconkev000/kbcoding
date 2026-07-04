import { Component } from '@angular/core';
import { SKILLS_LIST, SkillEntry } from '../about-data';

interface SkillSection {
  id: string;
  label: string;
  skills: SkillEntry[];
}

@Component({
  selector: 'app-about-skills',
  templateUrl: './about-skills.component.html',
  styleUrls: ['./about-skills.component.css'],
})
export class AboutSkillsComponent {
  readonly sections: SkillSection[] = [
    { id: 'languages', label: 'Languages', skills: SKILLS_LIST.languages },
    { id: 'frameworks', label: 'Frameworks', skills: SKILLS_LIST.frameworks },
    { id: 'libraries', label: 'Libraries', skills: SKILLS_LIST.libraries },
    { id: 'tools', label: 'Tools', skills: SKILLS_LIST.tools },
  ];

  expandedSection: string | null = null;
  animatedSections = new Set<string>();

  toggleSection(sectionId: string): void {
    this.expandedSection = this.expandedSection === sectionId ? null : sectionId;
    if (this.expandedSection === sectionId) {
      window.setTimeout(() => this.animatedSections.add(sectionId), 10);
    }
  }

  isExpanded(sectionId: string): boolean {
    return this.expandedSection === sectionId;
  }

  shouldAnimate(sectionId: string): boolean {
    return this.animatedSections.has(sectionId) && this.isExpanded(sectionId);
  }

  skillKey(name: string): string {
    return name.replace(/\s+/g, '-').toLowerCase();
  }
}
