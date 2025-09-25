import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

export interface ContactFormData {
  from_name: string;
  to_name: string;
  from_email: string;
  to_email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  
  // You'll need to replace these with your actual EmailJS credentials
  private readonly SERVICE_ID = 'your_service_id';
  private readonly TEMPLATE_ID = 'your_template_id';
  private readonly PUBLIC_KEY = 'your_public_key';

  constructor() {
    // Initialize EmailJS
    emailjs.init(this.PUBLIC_KEY);
  }

  async sendEmail(formData: ContactFormData): Promise<boolean> {
    try {
      const templateParams = {
        from_name: formData.from_name,
        to_name: formData.to_name,
        from_email: formData.from_email,
        to_email: formData.to_email,
        message: formData.message,
      };

      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        templateParams,
        this.PUBLIC_KEY
      );

      console.log('Email sent successfully:', response.status, response.text);
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }
}