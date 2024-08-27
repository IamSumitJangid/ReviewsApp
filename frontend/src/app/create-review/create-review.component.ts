import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ReviewService } from '../review.service';
import { Observable, Subscription } from 'rxjs';
import { SocketService } from '../socket.service';

@Component({
    selector: 'app-create-review',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FormsModule],
    templateUrl: './create-review.component.html',
    styleUrl: './create-review.component.scss'
})
export class CreateReviewComponent {
    public _form!: FormGroup;
    public title: string = "Add New Review";
    private reviewId!: string;

    constructor(private _fb: FormBuilder,
        private _router: Router,
        private _activeRoute: ActivatedRoute,
        private _socketService: SocketService,
        private _reviewService: ReviewService
    ) {
        _activeRoute.paramMap.subscribe((param: Params) => {
            this.reviewId = param["get"]("id") ?? "";
            if (this.reviewId) {
                this.title = "Edit Review";
                this.getReviewById()
            }
        });
        this.createForm();
    }

    private createForm(): void {
        this._form = this._fb.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            content: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    get formControls() {
        return this._form.controls;
    }

    public getReviewById(): void {
        this._reviewService.getReviewById(this.reviewId).subscribe({
            next: (res) => {
                this._form.patchValue({
                    title: res.title,
                    content: res.content
                });
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    public onSubmit(): void {
        if (this._form.valid) {
            const formValues = { ...this._form.value };
            const subs: Subscription = this.getAPIFunction(formValues).subscribe({
                next: (res: any) => {
                    subs.unsubscribe();
                    this._socketService.updateReview()
                    this._router.navigate(['/']);
                },
                error: (err: any) => {
                    subs.unsubscribe();
                    console.log(err);
                }
            })
        } else {
            this.markFormGroupTouched(this._form);
        }
    }

    markFormGroupTouched(formGroup: FormGroup) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            if (control instanceof FormGroup) {
                this.markFormGroupTouched(control);
            }
        });
    }

    private getAPIFunction(formData: any): Observable<any> {
        if (this.reviewId) {
            return this._reviewService.updateReview(this.reviewId, formData)
        }
        return this._reviewService.addReview(formData)
    }
}
