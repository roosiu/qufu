import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../mat/mat.module';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit {
  @Input() totalTime: number = 60; // Total time in seconds
  @Input() timerColor: string = 'var(--primary-color)'; // Timer color
  @Input() backgroundColor: string = 'var(--background-color3)'; // background color
  @Input() textColor: string = 'var(--secondary-color)'; // text color

  public displayTime: string = '0:00';
  public progress: number = 1;
  private timerInterval: any;
  private startTime!: number;
  public circumference: number = 2 * Math.PI * 45;

  constructor() {}

  ngOnInit(): void {
    this.startTime = Date.now();
    // this.startTimer();
  }

  private startTimer(): void {
    this.timerInterval = setInterval(() => {
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = this.totalTime * 1000 - elapsedTime;

      if (remainingTime <= 0) {
        clearInterval(this.timerInterval);
        this.displayTime = '0:00';
        this.progress = 0;
      } else {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        this.displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.progress = remainingTime / (this.totalTime * 1000);
      }
    }, 1000);
  }
}
