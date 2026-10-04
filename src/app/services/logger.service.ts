import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  info(message: string): void {
    console.log(
      '%c[INFO]',
      'color: green; font-weight: bold;',
      message
    );
  }

  warn(message: string): void {
    console.warn(
      '%c[WARN]',
      'color: orange; font-weight: bold;',
      message
    );
  }

  error(message: string, error?: unknown): void {

    console.error(
      '%c[ERROR]',
      'color: red; font-weight: bold;',
      message,
      error
    );

    const payload = {
      timestamp: new Date().toISOString(),
      message: message,
      stackTrace: this.getStackTrace(error),
      route: this.router.url
    };

    this.sendToBackend(payload);
  }

  private getStackTrace(error: unknown): string {
    if (error instanceof Error) {
      return error.stack ?? '';
    }

    return '';
  }

  private sendToBackend(payload: unknown): void {
    this.http.post('/api/logs', payload).subscribe({
      error: () => {
        // Don't allow logging failure to crash the application
      }
    });
  }
}