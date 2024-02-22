import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://pwksm.ovh/qufu/login.php';
  private logged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.GetIsLoggedFromToken();
  }

  login(email: string, password: string): Observable<any> {
    // Tworzenie obiektu z danymi logowania
    const loginData = {
      email: email,
      password: password,
    };

    // Wysłanie żądania POST do serwera
    return this.http.post<any>(this.apiUrl, loginData);
  }
  SetIsLogged(value: boolean) {
    this.logged.next(value);
  }
  GetLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }
  GetName() {
    return localStorage.getItem('name');
  }
  GetIsLoggedFromToken() {
    // Odczytaj token z localStorage
    const token = localStorage.getItem('token');
    // Sprawdź, czy token istnieje
    const loggedIn = !!token;
    if (!loggedIn) {
      return false;
    }
    this.SetIsLogged(true);
    return true;
  }
}
