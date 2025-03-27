import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NameCheckService {
  constructor(private http: HttpClient) {}

  checkNameExists(name: string): Observable<boolean> {
    return this.http.get<string[]>('/src/assets/names.json').pipe(
      delay(500), // Simulate network delay
      map(names => names.includes(name))
    );
  }
}
