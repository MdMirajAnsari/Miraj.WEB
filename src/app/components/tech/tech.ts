import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantsService, Technology } from '../../services/constants.service';

@Component({
  selector: 'app-tech',
  imports: [CommonModule],
  templateUrl: './tech.html',
  styleUrl: './tech.scss'
})
export class TechComponent {
  private constantsService = inject(ConstantsService);
  technologies: Technology[] = this.constantsService.technologies;
}
