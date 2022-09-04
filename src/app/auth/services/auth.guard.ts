import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    ) {}

  canActivate(): Observable<boolean> {
    return this.authService.usuarioLogado
      .pipe(
        take(1),
        map(usuario => {
          if(usuario)
            return true;

          this.router.navigate(["/login"]);
          return false;
        })
      )
  }

}
