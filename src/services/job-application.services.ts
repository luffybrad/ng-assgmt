import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Define an interface for your application data structure
interface JobApplication {
  id: number;
  name: string;
  email: string;
  skills: string[];
}

@Injectable({ providedIn: 'root' })
export class JobApplicationService {
  private API_URL = 'http://localhost:3000/applications';

  constructor(private http: HttpClient) {}

  getApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(this.API_URL);
  }

  addApplication(
    application: Omit<JobApplication, 'id'>
  ): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.API_URL, application);
  }

  checkNameExists(name: string): Observable<boolean> {
    return this.http
      .get<JobApplication[]>(this.API_URL)
      .pipe(
        map((applications: JobApplication[]) =>
          applications.some((app: JobApplication) => app.name === name)
        )
      );
  }
}
