import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './comment';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private commentUrl = 'https://localhost:44320/api/Comments';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHhttpOptions =  {observe: 'body', responseType: 'json'};

  myComments: Comment[];
  constructor(private http: HttpClient) { 
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentUrl)
      .pipe(
        catchError(this.handleError<Comment[]>('getComments', []))
      );
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentUrl, comment, this.httpOptions).pipe(
      catchError(this.handleError<Comment>('addComment'))
    );
  }

  deleteComment (comment: Comment | number): Observable<Comment> {
    const id = typeof comment === 'number' ? comment : comment.commentId;
    const url = `${this.commentUrl}/${id}`;

    return this.http.delete<Comment>(url, this.httpOptions).pipe(
      catchError(this.handleError<Comment>('deleteComment'))
    );
  }

    /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      return of(result as T);
    };
  }

}
