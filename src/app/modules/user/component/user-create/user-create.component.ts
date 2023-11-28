import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserSignupService } from 'src/app/infrastructure/services/user-signup.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  userForm!: FormGroup;
  hide = true;
  maxDate!: Date;

  constructor(
    private userSignupService: UserSignupService,
    private router: Router,
    private toasterService: ToasterService
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.maxDate = new Date(currentYear, currentMonth, currentDay - 1);
  }

  pipe = new DatePipe('en-US');

  ngOnInit(): void {
    this.userForm = new FormGroup({
      nombres: new FormControl(''),
      firt_name: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      verify_password: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      rol: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
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

  getErrorMessage(): string {
    if (this.userForm.valid && this.userForm.get('email')!.value.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userForm.valid && this.userForm.get('email')!.value.hasError('email') ? 'Not a valid email' : '';
  }

  onCreater(): void {
    const nombres = this.userForm.get('firt_name')?.value + '&' + this.userForm.get('last_name')?.value;
    const fechaFormateada = this.pipe.transform(this.userForm.get('fechaNacimiento')?.value, 'dd/MM/yyyy');
    this.userForm.get('nombres')?.setValue(nombres);
    this.userForm.get('rol')?.setValue('U');
    this.userForm.get('fechaNacimiento')?.setValue(fechaFormateada);

    this.userSignupService
      .createUser(this.userForm.value)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.toasterService.info(res.message, "Customer create");
            this.router.navigateByUrl('/login');
          }
        }
        , error: (error) => console.log('error', error)
      });
  }
}
