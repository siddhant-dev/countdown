import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'countdown-timer',
  standalone: true,
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() secondsLeft: number | null = null;
  @Input() apiEndpoint: string | null = null;
  @Output() deadlineReached: EventEmitter<void> = new EventEmitter();

  private intervalId: number | null = null;
  private apiSubscription: Subscription | null = null;

  errorMessage: string | null = null;

  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);
  // ngZone = inject(NgZone);

  ngOnInit(): void {
    if (this.apiEndpoint) {
      this.apiSubscription = this.http
        .get<{ secondsLeft: number }>(this.apiEndpoint)
        .subscribe({
          next: (response) => {
            this.secondsLeft = response.secondsLeft;
            this.startCountdown();
          },
          error: (err) => {
            console.error('Failed to fetch deadline:', err);
            this.errorMessage =
              'Failed to fetch API data. Please try again later.';
            this.secondsLeft = null;
          },
        });
    } else if (this.secondsLeft !== null) {
      this.startCountdown();
    } else {
      this.errorMessage = 'No valid input provided for countdown timer.';
    }
  }

  private startCountdown(): void {
    if (this.secondsLeft === null) return;

    // this.ngZone.runOutsideAngular(() => {
     
    // });
     this.intervalId = window.setInterval(() => {
        if (this.secondsLeft && this.secondsLeft > 0) {
          this.secondsLeft--;
          this.cdr.markForCheck();
        } else {
          this.stopCountdown();
          this.deadlineReached.emit();
        }
      }, 1000);
  }

  private stopCountdown(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  ngOnDestroy(): void {
    this.stopCountdown();
    if (this.apiSubscription && !this.apiSubscription.closed) {
      this.apiSubscription.unsubscribe();
    }
  }
}
