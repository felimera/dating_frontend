import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Customer } from 'src/app/core/models/customer.model';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { DatePipe } from '@angular/common';
import { CustomerService } from 'src/app/infrastructure/services/customer.service';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  userForm!: FormGroup;
  usuario: CustomerDTO | undefined;
  hide = true;

  pipe = new DatePipe('en-US');

  constructor(
    private cookieService: CookieService,
    private customerService: CustomerService,
    private toasterService: ToasterService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuario = JSON.parse(this.cookieService.get('usuario'));
    const fechaFormateada = this.pipe.transform(this.usuario!.fechaNacimiento, 'MM-dd-yyyy');

    this.userForm = new FormGroup({
      nombre: new FormControl(this.usuario!.nombre, [Validators.required]),
      apellido: new FormControl(this.usuario!.apellido, [Validators.required]),
      genero: new FormControl(this.usuario!.genero[0], [Validators.required]),
      fechaNacimiento: new FormControl(new Date(fechaFormateada!), [Validators.required]),
      telefono: new FormControl(this.usuario!.telefono, [Validators.required]),
      correo: new FormControl(this.usuario!.correo, [Validators.required, Validators.email]),
      rol: new FormControl(this.usuario!.rol[0], [Validators.required])
    });
  }

  getErrorMessage(): string {
    if (this.userForm.valid && this.userForm.get('email')!.value.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userForm.valid && this.userForm.get('email')!.value.hasError('email') ? 'Not a valid email' : '';
  }

  onEditUser(): void {
    const fechaFormateada = this.pipe.transform(this.userForm.get('fechaNacimiento')?.value, 'dd/MM/yyyy');
    this.userForm.get('fechaNacimiento')?.setValue(fechaFormateada);
    this.customerService
      .putCustomer(this.usuario!.id, this.userForm.value)
      .subscribe({
        next: (res: Customer) => {
          if (res) {
            localStorage.removeItem('TOKEN');
            localStorage.setItem('TOKEN', res.token!)
            this.cookieService.set('usuario', JSON.stringify(res));
            this.toasterService.info('Usuario editado con exito.', 'Customer edit');
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        },
        error: (res: any) => console.log(res)
      });
  }

  onCancel(): void {
    this.router.navigateByUrl('/home');
  }
}
