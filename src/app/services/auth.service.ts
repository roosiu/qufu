import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://pwksm.ovh/qufu/login.php';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    // Tworzenie obiektu z danymi logowania
    const loginData = {
      email: email,
      password: password,
    };

    // Wysłanie żądania POST do serwera
    return this.http.post<any>(this.apiUrl, loginData);
  }
}
