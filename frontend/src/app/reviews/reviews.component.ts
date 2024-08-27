import { Component } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';

type Review = {
  id: string;
  title: string;
  content: string;
  createdAt: string|Date;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, TitleCasePipe],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {
  public title = 'Reviews List';
  public reviewsList: Review[] = [];

  constructor(private _router: Router) {

  }

  public onAdd(): void {
    this._router.navigate(['/new']);
  }

  public onEdit(reviewId: string): void {
    this._router.navigate(['/', reviewId]);
  }

  public onDelete(): void {

  }
}
