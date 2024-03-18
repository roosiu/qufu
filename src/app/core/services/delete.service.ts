import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DeleteUrls } from '../enums/urls';
@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  /**
   * Service resposible for deleting records in database
   * @date 2024-03-03
   */
  constructor(private http: HttpClient, private authService: AuthService) {}
  private apiUrl = DeleteUrls.DELETE_URL;
  private logged = new BehaviorSubject<boolean>(false);

  /**
   * Method deleting record in database;
   * @date 2024-03-03
   * @param { any } token - token from local data storage
   * @param { string } name - name of user
   * @param { number } id_to_delete - item id to delete
   * @param { string } table - tabel name from database
   */
  delete(
    token: any,
    name: string,
    id_to_delete: number,
    table: string
  ): Observable<any> {
    // Tworzenie obiektu z danymi do zapostowania
    const postData = {
      token: token,
      name: name,
      id_to_delete: id_to_delete,
      table: table,
    };

    // Wysłanie żądania POST do serwera
    return this.http.post<any>(this.apiUrl, postData);
  }
}
