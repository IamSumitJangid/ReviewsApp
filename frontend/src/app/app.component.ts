import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';
import { HttpClientModule } from '@angular/common/http';
import { ReviewService } from './review.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'Reviews App';

  constructor(private socketService: SocketService,
    private _reviewService: ReviewService
  ) {

  }

  ngOnInit(): void {
    this.socketService.onReviewListener().subscribe((res: any) => {
      this._reviewService.onChangeListener.next({res});
    })
  }

  
}
