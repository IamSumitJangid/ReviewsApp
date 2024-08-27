import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'Reviews App';

  constructor(private socketService: SocketService) {

  }

  ngOnInit(): void {
    this.socketService.onReviewListner().subscribe({
      next: (res: any) => {
        console.log(res);
      }
    })
  }

  
}
