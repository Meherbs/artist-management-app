import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = 'Chargement en cours';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private _flashMessagesService: FlashMessagesService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {


  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    //this.error = 'chargement en cours...'
    // stop here if form is invalid
    this._flashMessagesService.show('Chargement en cours...!', { cssClass: 'alert-message-important alert-inform', timeout: 3000 });
    //this._flashMessagesService.show('Failure!', { cssClass: 'alert-danger' } );

    if (this.loginForm.invalid) {
      return;
    }

    //UtilityService.showPreloader();
    //this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {

          this.error = '';
          this.loading = false;
          //his._flashMessagesService.
          this.router.navigate(['/']);
          //this.router.navigate([this.returnUrl]);
        },
        error => {

          this.error = error;
          this._flashMessagesService.show('Erreur ! ' + error, { cssClass: 'alert-message-important alert-error', timeout: 9000 });
          this.loading = false;
        }
      );
  }

}
