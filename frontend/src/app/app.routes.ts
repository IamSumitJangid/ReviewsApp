import { Routes } from '@angular/router';
import { CreateReviewComponent } from './create-review/create-review.component';
import { ReviewsComponent } from './reviews/reviews.component';

export const routes: Routes = [{
        path: '',
        component: ReviewsComponent
    }, {
        path: 'new',
        component: CreateReviewComponent
    }, {
        path: ':id',
        component: CreateReviewComponent
    }];
