import { Component } from '@angular/core';
import { ABOUT_EXPERIENCE, ABOUT_HOBBIES } from '../about-data';

@Component({
  selector: 'app-about-content',
  templateUrl: './about-content.component.html',
  styleUrls: ['./about-content.component.css'],
})
export class AboutContentComponent {
  readonly hobbies = ABOUT_HOBBIES;
  readonly experience = ABOUT_EXPERIENCE;
  readonly profileImage = 'assets/images/about/profile_img.png';
}
