import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, delay } from 'rxjs/operators';

interface JobApplication {
  id: number;
  name: string;
  email: string;
  skills: string[];
}
@Injectable({ providedIn: 'root' })
export class NameCheckService {
  private API_URL = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  checkNameExists(name: string): Observable<boolean> {
    return this.http.get<JobApplication[]>(this.API_URL).pipe(
      delay(500),
      map((applications: JobApplication[]) =>
        applications.some((app: JobApplication) => app.name === name)
      ),
      catchError(() => of(false))
    );
  }
}
