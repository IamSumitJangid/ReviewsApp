import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket = (<any>io).connect(environment.SOCKET, { transport: ['websocket'] });

  public onReviewListener(): Observable<any> {
    const observable = new Observable(observer => {
      this.socket.on('updated-reviews', (res: any) => {
        observer.next(res);
      });
    })
    return observable;
  }

  public updateReview(): void {
    this.socket.emit('reviews', {message: "update"});
  }

}