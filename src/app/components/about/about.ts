import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstantsService, Service } from '../../services/constants.service';

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutComponent {
  private constantsService = inject(ConstantsService);
  services: Service[] = this.constantsService.services;
}
