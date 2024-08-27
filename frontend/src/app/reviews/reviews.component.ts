import { Component, OnInit } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { Subscription } from 'rxjs';
import { SocketService } from '../socket.service';

type Review = {
    _id: string;
    title: string;
    content: string;
    updatedAt: string | Date;
}

@Component({
    selector: 'app-reviews',
    standalone: true,
    imports: [CommonModule, TitleCasePipe],
    templateUrl: './reviews.component.html',
    styleUrl: './reviews.component.scss'
})
export class ReviewsComponent implements OnInit {
    public title = 'Reviews List';
    public reviewsList: Review[] = [];

    constructor(
        private _router: Router,
        private _socketService: SocketService,
        private _reviewService: ReviewService
    ) {
        // hook for socket listener
        this._reviewService.onChangeListener.subscribe(() => {
            this.getReviews();
        });
    }

    ngOnInit(): void {
        this.getReviews();
    }

    public getReviews(): void {
        const subs: Subscription = this._reviewService.getReviews().subscribe({
            next: (res: any) => {
                subs.unsubscribe();
                this.reviewsList = res;
                console.log(this.reviewsList)
            },
            error: (err: any) => {
                subs.unsubscribe();
                console.log(err)
            }
        })
    }

    public onAdd(): void {
        this._router.navigate(['/new']);
    }

    public onEdit(reviewId: string): void {
        this._router.navigate(['/', reviewId]);
    }

    public onDelete(reviewId: string): void {

        const subs: Subscription = this._reviewService.deleteReviewById(reviewId).subscribe({
            next: (res: any) => {
                subs.unsubscribe();
                this._socketService.updateReview()
                this.getReviews();
            },
            error: (err: any) => {
                subs.unsubscribe();
                console.log(err)
            }
        })
    }
}
