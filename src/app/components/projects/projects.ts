import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantsService, Project } from '../../services/constants.service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsComponent {
  private constantsService = inject(ConstantsService);
  projects: Project[] = this.constantsService.projects;
}
