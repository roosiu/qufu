import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchService } from './search.service';
import { AuthUrls } from '../enums/urls';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  /**
   * Service responsible for authentication-related functionality.
   */
  private RegisterloginUrl = AuthUrls.REGISTER_URL_LOGIN;
  private loginUrl = AuthUrls.LOGIN_URL;
  private updateProfileUrl = AuthUrls.UPDATE_PROFILE_URL;
  private getProfileUrl = AuthUrls.GET_PROFILE_URL;
  private logged = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private searchService: SearchService) {
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
    return this.http.post<any>(this.loginUrl, loginData);
  }
  /**
   * register - new user.
   *
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @param {string} name - The user's name.
   * @return {Observable<any>} description of return value
   */
  register(email: string, password: string, name: string): Observable<any> {
    // Tworzenie obiektu z danymi logowania
    const registerData = {
      email: email,
      password: password,
      name: name,
    };
    // send POST to server
    return this.http.post<any>(this.RegisterloginUrl, registerData);
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

  /**
   * Update the profile with the provided position and value.
   *
   * @param {string} position - the position to update
   * @param {string} value - the value to update
   * @param {string} token - the token to use
   * @param {string} name - the name to use
   * @return {Observable<any>} the observable for the POST request
   */
  UpdateProfile(
    position: string,
    value: string,
    token: string,
    name: string
  ): Observable<any> {
    const loginData = {
      position: position,
      value: value,
      token: token,
      name: name,
    };
    // send POST to server
    return this.http.post<any>(this.updateProfileUrl, loginData);
  }

  GetFavorite(): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      if (this.GetToken()) {
        this.searchService.getJsonData('?token=' + this.GetToken()).subscribe(
          (data) => {
            // const favorite = data.map((item) => item.favorite);
            const favorite = data[0].favorite.split(',');
            resolve(favorite);
          },
          (error) => {
            reject(error); // Handle error if needed
          }
        );
      } else {
        reject('No token available');
      }
    });
  }
}
