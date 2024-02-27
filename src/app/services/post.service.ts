import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private apiUrl = 'https://pwksm.ovh/qufu/post.php';
  private logged = new BehaviorSubject<boolean>(false);

  post(
    token: any,
    name: string,
    recipe_id: number,
    rating: number,
    comment: string
  ): Observable<any> {
    // Tworzenie obiektu z danymi do zapostowania
    const postData = {
      token: token,
      name: name,
      recipe_id: recipe_id,
      rating: rating,
      comment: comment,
    };

    // Wysłanie żądania POST do serwera
    return this.http.post<any>(this.apiUrl, postData);
  }
}
