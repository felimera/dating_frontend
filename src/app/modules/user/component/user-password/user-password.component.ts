import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.css']
})
export class UserPasswordComponent implements OnInit {

  userForm!: FormGroup;
  hide = true;

  ngOnInit(): void {

    this.userForm = new FormGroup({
      password_old: new FormControl('', [Validators.required]),
      password_new: new FormControl('', [Validators.required]),
      verify_password_new: new FormControl('', [Validators.required])
    });

    //Not sure if Angular unsubscribes to this, so best to do it yourself
    this.userForm.valueChanges.subscribe((change) => {
      if (change.password !== change.verify_password) {
        this.userForm.get('verify_password')!.setErrors({ isError: true });
      } else if (change.verify_password === '') {
        //this is needed in case the user empties both fields, else it would
        //say they matched and therefore it's valid - the custom validator will
        //not pick up on this edge case
        this.userForm.get('verify_password')!.setErrors({ isError: true });
      } else if (change.password === change.verify_password) {
        //this removes the previously set errors
        this.userForm.get('verify_password')!.setErrors(null);
      }
    });
  }

  onChangePassword(): void {

  }
}
