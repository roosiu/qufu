import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  /**
   * Service responsible for post data in database
   * @date 2024-03-03
   */
  constructor(private http: HttpClient) {}

  /**
   *
   * @param {string} apiUrl - server side adress
   */
  private apiUrl = 'https://pwksm.ovh/qufu/post.php';

  /**
   * Function to post comment or and rating in database
   * @date 2024-03-03
   * @param { any } token - token from local storage
   * @param { string } name - name of user
   * @param { number } recipe_id - id of recipe
   * @param { number } rating - rating of recipe in comment
   * @param { string } comment - comment
   * @returns { Observable<any> }
   */
  post(
    token: any,
    name: string,
    recipe_id: number,
    rating: number,
    comment: string
  ): Observable<any> {
    const postData = {
      token: token,
      name: name,
      recipe_id: recipe_id,
      rating: rating,
      comment: comment,
    };
    /**
     *  sending post data to server
     */
    return this.http.post<any>(this.apiUrl, postData);
  }
}
