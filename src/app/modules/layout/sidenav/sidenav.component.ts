import { Component, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { CookieService } from 'ngx-cookie-service';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  opened = true;
  customer: CustomerDTO | any;
  navBarDatas: any = [];

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toasterService: ToasterService
  ) { }

  ngOnInit(): void {
    this.navBarDatas = navbarData;
    if (this.cookieService.check('usuario')) {
      this.customer = JSON.parse(this.cookieService.get('usuario'));
    }

    this.navBarDatas = this.navBarDatas.filter((data: any) => data.security_access === 'T');

    if (this.isExistUser()) {
      const tipoUsuario = this.customer.rol;
      if (tipoUsuario[0] === 'U') {
        this.navBarDatas = navbarData;
        this.navBarDatas = this.navBarDatas.filter((data: any) => data.access_by_user_role === 'U');
      } else {
        this.navBarDatas = navbarData;
      }
    }
  }

  isExistUser(): boolean {
    return (this.cookieService.check('usuario') && localStorage.getItem('TOKEN')!.length > 0)
  }

  validarTipoUsuario(): boolean {
    if (this.isExistUser()) {
      const tipoUsuario = this.customer.rol;
      return tipoUsuario[0] === 'A';
    }
    return false;
  }

  cerrarSesion(): void {
    this.cookieService.delete('usuario');
    localStorage.removeItem('TOKEN');
    this.toasterService.info('Haz cerrado sesion.', 'User sign out')
    setTimeout(() => {
      window.location.reload();
      this.router.navigateByUrl('/home');
    }, 3000);
  }
}
