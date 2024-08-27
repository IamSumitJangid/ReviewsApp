import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

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
        private _activeRoute: ActivatedRoute
    ) {
        _activeRoute.paramMap.subscribe((param: Params) => {
            this.reviewId = param["get"]("id") ?? "";
            if (this.reviewId) {
                this.title = "Edit Review"
            }
        });
        this.createForm();
    }

    private createForm(): void {
        this._form = this._fb.group({
            title: ['', [Validators.required, Validators.minLength(2)]],
            content: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    public onSubmit(): void {
        console.log(this._form.valid)
        console.log(this._form.value)
        if (this._form.valid) {
            const formValues = { ...this._form.value };

            this._router.navigate(['/']);
        } else {
            
        }
        console.log("form")
    }
}
