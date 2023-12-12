import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CustomerDTO } from 'src/app/infrastructure/dto/customer.dto';
import { Router } from '@angular/router';
import { ToasterService } from 'src/app/infrastructure/services/generally/toaster.service';
import { AccessPermitsService } from 'src/app/infrastructure/services/access-permits.service';
import { AccessPermits } from 'src/app/core/models/access-permits.model';
import { LinkRouterDTO } from 'src/app/infrastructure/dto/link-router.dto';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  opened = true;
  customer: CustomerDTO | any;
  navBarDatas: LinkRouterDTO[] = [];

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toasterService: ToasterService,
    private accessPermitsService: AccessPermitsService
  ) { }

  ngOnInit(): void {
    if (this.cookieService.check('usuario')) {
      this.customer = JSON.parse(this.cookieService.get('usuario'));
      this.loadBrowserDataWithId(this.customer.id);
    }
    else {
      this.loadBrowserData();
    }
  }

  loadBrowserDataWithId(id: number): void {
    this.accessPermitsService
      .getAccessPermitsByIdCustomer(id)
      .subscribe({
        next: (res: AccessPermits) => {
          if (res) {
            res.listRouterList.forEach(data => {
              this.navBarDatas.push({ label: data.label, icon: data.icon, url: data.url, description: data.description });
            })
          }
        }, error: (res: any) => console.log('res', res)
      });
  }

  loadBrowserData(): void {
    this.accessPermitsService
      .getAccessPermitsWithoutId()
      .subscribe({
        next: (res: AccessPermits) => {
          if (res) {
            res.listRouterList.forEach(data => {
              this.navBarDatas.push({ label: data.label, icon: data.icon, url: data.url, description: data.description });
            })
          }
        }, error: (res: any) => console.log('res', res)
      });
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
    this.router.navigateByUrl('/home');
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  }
}
