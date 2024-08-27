import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../environments/environment.development';
import { ADD_REVIEW, DELETE_REVIEW, GET_REVIEWS, UPDATE_REVIEW } from './contants';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private API_URL: string = environment.API;
  public onChangeListener: Subject<any> = new Subject(); 

  constructor(private http: HttpClient) { }

  public getReviews(): Observable<any> {
    return this.http.get(this.API_URL+GET_REVIEWS)
  }

  public getReviewById(reviewId: string): Observable<any> {
    return this.http.get(this.API_URL+GET_REVIEWS+"/"+reviewId)
  }

  public addReview(formData: any): Observable<any> {
    return this.http.post(this.API_URL+ADD_REVIEW, formData)
  }

  public updateReview(reviewId: string, formData: any): Observable<any> {
    return this.http.put(this.API_URL+UPDATE_REVIEW+reviewId, formData)
  }

  public deleteReviewById(reviewId: string): Observable<any> {
    return this.http.delete(this.API_URL+DELETE_REVIEW+reviewId)
  }
}
