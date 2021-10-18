import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetPasswordForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {

  }

  // convenience getter for easy access to form fields
  get f() { return this.forgetPasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    console.log({
      'data': this.f.email.value,
      'invalid': this.forgetPasswordForm.invalid
    });

    // stop here if form is invalid
    if (this.forgetPasswordForm.invalid) {
      //return;
    }
    this.loading = true;
    this.authenticationService.forgetPassword(this.f.email.value)
      .pipe(map(
        response => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (response) {
            if (response.code == 0) {
              this.error = response.response;
            } else {
              this.message = response.response;
            }
          }
        }
      ))
      .subscribe(
        data => {
          console.log(data);
          this.loading = false;
          //this.error = data.response;
          //this.router.navigate(['/']);
          //this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        }
      );
  }

}
