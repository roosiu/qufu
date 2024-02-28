import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DeleteService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private apiUrl = 'https://pwksm.ovh/qufu/delete.php';
  private logged = new BehaviorSubject<boolean>(false);

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
