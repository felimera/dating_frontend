import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';
import { UserPasswordService } from 'src/app/infrastructure/services/user-password.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  userForm!: FormGroup;
  hide = true;

  customerDTO: CustomerDTO | undefined;

  constructor(
    private cookieService: CookieService,
    private userPasswordService: UserPasswordService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.customerDTO = JSON.parse(this.cookieService.get('usuario'));

    this.userForm = new FormGroup({
      email: new FormControl(this.customerDTO!.correo, [Validators.required]),
      passwordOld: new FormControl('', [Validators.required]),
      passwordNew: new FormControl('', [Validators.required]),
      verify_password_new: new FormControl('', [Validators.required])
    });

    this.userForm.valueChanges.subscribe((change) => {
      if (change.passwordNew !== change.verify_password_new) {
        this.userForm.get('verify_password_new')!.setErrors({ isError: true });
      } else if (change.verify_password_new === '') {
        this.userForm.get('verify_password_new')!.setErrors({ isError: true });
      } else if (change.passwordNew === change.verify_password_new) {
        this.userForm.get('verify_password_new')!.setErrors(null);
      }
    });
  }

  onChangePassword(): void {
    this.userPasswordService
      .updatePassword(this.userForm.value)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.toasterService.info(res.message, "Change password");
            setTimeout(() => {
              this.userForm.get('passwordOld')!.setValue("");
              this.userForm.get('passwordNew')!.setValue("");
              this.userForm.get('verify_password_new')!.setValue("");
            }, 3000);
          }
        },
        error: res => this.toasterService.error(res.error.message, "Change password")
      })
  }

  onClearClose() {
    this.userForm.get('passwordOld')!.setValue("");
    this.userForm.get('passwordNew')!.setValue("");
    this.userForm.get('verify_password_new')!.setValue("");
    this.router.navigateByUrl('/home');
  }
}
