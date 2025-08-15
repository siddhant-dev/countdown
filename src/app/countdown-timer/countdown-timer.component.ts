import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  inject,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, of } from 'rxjs';
import { take, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'countdown-timer',
  standalone: true,
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() secondsLeft: number | null = null;
  @Input() apiEndpoint: string | null = null;
  @Output() deadlineReached: EventEmitter<void> = new EventEmitter();

  private subs: Subscription = new Subscription();

  errorMessage: string | null = null;

  http = inject(HttpClient);
  cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.initializeCountdown();
  }

  private initializeCountdown(): void {
    if (this.apiEndpoint) {
      this.fetchSecondsFromApi();
    } else if (this.secondsLeft !== null) {
      this.startCountdown();
    } else {
      this.errorMessage = 'No valid input provided for countdown timer.';
    }
  }

  private fetchSecondsFromApi(): void {
    this.subs.add(this.http
      .get<{ secondsLeft: number }>(this.apiEndpoint!)
      .pipe(
        catchError((error) => {
          console.error('Failed to fetch data:', error);
          this.setErrorMessage('Failed to fetch API data. Please try again later.');
          return of(null); 
        })
      )
      .subscribe((response) => {
        if (response?.secondsLeft != null) {
          this.secondsLeft = response.secondsLeft;
          this.startCountdown();
        } else {
          this.setErrorMessage('Invalid API response.');
        }
      }));
  }

  private startCountdown(): void {
    if (this.secondsLeft === null || this.secondsLeft <= 0) {
      this.setErrorMessage('Invalid countdown duration.');
      return;
    }

    const startingValue = this.secondsLeft!;
    this.subs.add(interval(1000)
      .pipe(
        take(startingValue), 
        map((elapsed) => startingValue - elapsed - 1) 
      )
      .subscribe({
        next: (remainingSeconds) => {
          this.updateRemainingSeconds(remainingSeconds);
        },
        complete: () => {
          this.updateRemainingSeconds(0);
          this.emitDeadlineReached();
        },
      }));
  }

  private updateRemainingSeconds(remainingSeconds: number): void {
    this.secondsLeft = remainingSeconds;
    this.cdr.markForCheck(); 
  }

  private emitDeadlineReached(): void {
    this.deadlineReached.emit();
  }

  private setErrorMessage(message: string): void {
    this.errorMessage = message;
    this.secondsLeft = null;
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}