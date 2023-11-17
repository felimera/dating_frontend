import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomerDTO } from './infrastructure/dto/customer.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'dating_frontend';
  opened = false;

  customer: CustomerDTO | any;

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.isExistUser();
  }

  isExistUser(): boolean {
    return (this.cookieService.check('usuario') && localStorage.getItem('TOKEN')!.length > 0)
  }

  validarTipoUsuario(): boolean {
    if (this.isExistUser()) {
      this.customer = JSON.parse(this.cookieService.get('usuario'));
      const tipoUsuario = this.customer.rol;
      console.log(tipoUsuario[0])
      return tipoUsuario[0] === 'A';
    }
    return false;
  }

  cerrarSesion(): void {
    this.cookieService.delete('usuario');
    localStorage.removeItem('TOKEN')
  }
}
