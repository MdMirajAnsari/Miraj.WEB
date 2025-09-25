import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class ContactComponent {
  private emailService = inject(EmailService);

  // Contact form functionality can be implemented here
}
