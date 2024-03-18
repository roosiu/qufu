import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { PostUrls } from '../enums/urls';
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
  private apiUrlToPostComment = PostUrls.URL_TO_POST_COMMENT;
  private apiUrlToPostArticle = PostUrls.URL_TO_POST_ARTICLE;
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
  postComment(
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
    return this.http.post<any>(this.apiUrlToPostComment, postData);
  }

  /**
   *  sending post/update data to server
   *
   * @param {string} id - id of article if exist if not create new article in backend
   * @param {any} token - token from local storage
   * @param {string} name - name of user
   * @param {string} title - title of article
   * @param {string} author - author of article
   * @param {Date} date -  date of article
   * @param {string} content -  content of article
   * @param {string} tags -  tags of article
   * @param {string} img -  main img of article
   * @return {Observable<any>} return value
   */
  postUpdateArticle(
    id: string,
    token: any,
    name: string,
    title: string,
    author: string,
    date: Date,
    content: string,
    tags: string,
    img: string
  ): Observable<any> {
    const postData = {
      id: id,
      token: token,
      name: name,
      title: title,
      author: author,
      date: date,
      content: content,
      tags: tags,
      img: img,
    };
    /**
     *  sending post data to server
     */
    return this.http.post<any>(this.apiUrlToPostArticle, postData);
  }
}
