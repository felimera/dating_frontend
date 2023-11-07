import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserTokenService } from 'src/app/infrastructure/services/user-token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit {

  userTokenForm!: FormGroup;
  hide = true;

  constructor(private userLogin: UserTokenService, private router: Router) { }

  ngOnInit() {
    this.userTokenForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('')
    });
  }

  getErrorMessage(): string {
    if (this.userTokenForm.valid && this.userTokenForm.get('email')!.value.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userTokenForm.valid && this.userTokenForm.get('email')!.value.hasError('email') ? 'Not a valid email' : '';
  }

  onLogin(): void {
    this.userLogin.postToken(this.userTokenForm.value).subscribe((res: any) => {
      localStorage.setItem('TOKEN', res.jwtToken);
      this.router.navigateByUrl('/');
    }, error => console.error('error', error));
  }

  onCreater(): void {
    this.router.navigateByUrl('/user-create');
  }
}
