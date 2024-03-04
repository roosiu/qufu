import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatModule } from '../mat/mat.module';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [CommonModule, FormsModule, MatModule],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css',
})
export class TimerComponent implements OnInit, OnDestroy {
  /**
   * Timer component for displaying a circular progress bar.
   * @param {number} totalTime - The total time in minutes.
   * @param {string} timerColor - The color of the timer.
   * @param {string} backgroundColor - The color of the background.
   * @param {string} textColor - The color of the text.
   * @returns {void}
   *
   */
  @Input() totalTime: number = 5;
  @Input() timerColor: string = 'brown';
  @Input() backgroundColor: string = 'white';
  @Input() textColor: string = 'darkblue';

  public displayTime: string = '0:00';
  public progress: number = 1;
  public timerInterval: any;
  public startTime!: number;
  public circumference: number = 2 * Math.PI * 45;
  private audio: HTMLAudioElement;
  constructor() {
    this.audio = new Audio();
    this.audio.src = 'assets/sounds/alarm.mp3';
    this.audio.load();
  }
  ngOnDestroy(): void {
    this.stopTimer();
  }
  /**
   * Play the audio.
   *
   * @return {void}
   */
  play(): void {
    this.audio.play();
  }
  /**
   * stop the audio
   *
   * @return {void}
   */
  stop(): void {
    this.audio.pause();
  }
  ngOnInit(): void {}

  /**
   * Starts a timer and updates the display and progress at regular intervals.
   *
   * @return {void}
   */
  startTimer(): void {
    this.startTime = Date.now();
    this.displayTime = '0:00';
    this.progress = 0;
    this.timerInterval = setInterval(() => {
      const elapsedTime = Date.now() - this.startTime;
      const remainingTime = this.totalTime * 60 * 1000 - elapsedTime;
      if (remainingTime <= 0) {
        // Assuming there's a method available in the class to play a sound
        this.play();
        this.displayTime = '0:00';
      } else {
        const minutes = Math.floor(remainingTime / 60000);
        const seconds = Math.floor((remainingTime % 60000) / 1000);
        this.displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        this.progress = remainingTime / (this.totalTime * 60 * 1000);
      }
    }, 1000);
  }

  /**
   * Change the time based on the given value.
   *
   * @param {number} value - the value to change the time by
   * @return {void}
   */
  changeTime(value: number): void {
    if (value < 0) {
      if (this.totalTime > 1) {
        this.totalTime -= 1;
      }
    } else {
      this.totalTime += 1;
    }
  }
  /**
   * Stop the timer and reset the progress and start time.
   */
  stopTimer() {
    this.stop();
    clearInterval(this.timerInterval);
    this.timerInterval = null;
    this.progress = 0;
  }
}
