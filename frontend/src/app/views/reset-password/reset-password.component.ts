import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  loading = false;
  submitted = false;
  token = '';
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.resetPassForm = this.formBuilder.group({
      password: ['', Validators.required],
      confirmedPassword: ['', Validators.required]
    },
      {
        // check whether our password and confirm password match
        validator: this.checkPasswords
      });

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmedPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParams['token'] || '';

    if (this.token == '') {
      this.router.navigate(['/']);
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetPassForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.resetPassForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.resetPassword(this.f.password.value, this.token)
      .pipe(
        map(response => {
          console.log(response);
        })
      )
      .subscribe(
        data => {
          this.loading = false;
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
