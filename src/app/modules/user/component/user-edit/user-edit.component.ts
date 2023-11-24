import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Customer } from 'src/app/core/models/customer.model';
import { UserSignup } from 'src/app/core/models/user-signup.model';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { DatePipe } from '@angular/common';
import { CustomerService } from 'src/app/infrastructure/services/customer.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  hide = true;

  pipe = new DatePipe('en-US');

  constructor(
    private cookieService: CookieService,
    private customerService: CustomerService
  ) { }
  
  ngOnInit(): void {
    const usuario: CustomerDTO = JSON.parse(this.cookieService.get('usuario'));
    const fechaFormateada = this.pipe.transform(usuario.fechaNacimiento, 'MM-dd-yyyy');

    this.userForm = new FormGroup({
      nombre: new FormControl(usuario.nombre, [Validators.required]),
      apellido: new FormControl(usuario.apellido, [Validators.required]),
      genero: new FormControl(usuario.genero[0], [Validators.required]),
      fechaNacimiento: new FormControl(new Date(fechaFormateada!), [Validators.required]),
      telefono: new FormControl(usuario.telefono, [Validators.required]),
      correo: new FormControl(usuario.correo, [Validators.required, Validators.email]),
      rol: new FormControl(usuario.rol, [Validators.required])
    });
  }

  getErrorMessage(): string {
    if (this.userForm.valid && this.userForm.get('email')!.value.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userForm.valid && this.userForm.get('email')!.value.hasError('email') ? 'Not a valid email' : '';
  }

  onEditUser(): void {
    throw new Error('Method not implemented.');
  }
}
