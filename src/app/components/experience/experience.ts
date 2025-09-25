import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantsService, Experience } from '../../services/constants.service';

@Component({
  selector: 'app-experience',
  imports: [CommonModule],
  templateUrl: './experience.html',
  styleUrl: './experience.scss'
})
export class ExperienceComponent {
  private constantsService = inject(ConstantsService);
  experiences: Experience[] = this.constantsService.experiences;
}
