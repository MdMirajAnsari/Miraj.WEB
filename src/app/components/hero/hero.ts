import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [CommonModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class HeroComponent implements OnInit, OnDestroy {
  private animationId: number | null = null;

  ngOnInit(): void {
    this.startScrollAnimation();
  }

  ngOnDestroy(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private startScrollAnimation(): void {
    const scrollDot = document.querySelector('.scroll-dot');
    if (!scrollDot) return;

    let y = 0;
    let direction = 1;

    const animate = () => {
      y += direction * 0.5;
      if (y >= 24 || y <= 0) {
        direction *= -1;
      }
      
      (scrollDot as HTMLElement).style.transform = `translateY(${y}px)`;
      this.animationId = requestAnimationFrame(animate);
    };

    animate();
  }
}
