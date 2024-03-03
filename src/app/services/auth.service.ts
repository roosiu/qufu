import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Service responsible for authentication-related functionality.
   */
  private apiUrl = 'https://pwksm.ovh/qufu/login.php';
  private logged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {
    this.GetIsLoggedFromToken();
  }

  /**
   * Logs in the user with the provided email and password.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Observable<any>} An observable containing the login response.
   */
  login(email: string, password: string): Observable<any> {
    // Tworzenie obiektu z danymi logowania
    const loginData = {
      email: email,
      password: password,
    };
    // send POST to server
    return this.http.post<any>(this.apiUrl, loginData);
  }

  /**
   * Sets the logged-in status.
   *
   * @param {boolean} value - The value indicating whether the user is logged in.
   */
  SetIsLogged(value: boolean) {
    this.logged.next(value);
  }

  /**
   * Gets the logged-in status.
   *
   * @returns {Observable<boolean>} An observable of the current logged-in status.
   */
  GetLogged(): Observable<boolean> {
    return this.logged.asObservable();
  }

  /**
   * Retrieves the name from local storage.
   *
   * @returns {string} The user's name.
   */
  GetName(): string | null {
    return localStorage.getItem('name');
  }

  /**
   * Retrieves the token from local storage.
   *
   * @returns {string} The authentication token.
   */
  GetToken(): string | null {
    return localStorage.getItem('token');
  }
  /**
   * Removes name and token from local storage
   */
  RemoveToken() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
  }
  /**
   * Retrieves the logged-in status from the authentication token stored in local storage.
   *
   * @returns {boolean} The logged-in status based on the presence of the authentication token.
   */
  GetIsLoggedFromToken(): boolean {
    const loggedIn = !!this.GetToken();
    if (!loggedIn) {
      return false;
    }
    this.SetIsLogged(true);
    return true;
  }
}
