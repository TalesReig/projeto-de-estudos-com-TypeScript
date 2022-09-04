import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './auth/services/auth.guard';
import { LoginGuard } from './auth/services/login.guard';
import { PainelComponent } from './painel/painel.component';

const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {path: "painel", component: PainelComponent, canActivate: [AuthGuard]},
  {path: "departamentos", loadChildren: ()=> import("./departamentos/departamento.module")
    .then(m => m.DepartamentoModule),
    canActivate: [AuthGuard]
  },
  {path: "produtos", loadChildren: ()=> import("./produtos/produto.module")
  .then(m => m.ProdutoModule),
  canActivate: [AuthGuard]
  },
  {path: "funcionarios", loadChildren: ()=> import("./funcionarios/funcionario.module")
  .then(m => m.FuncionarioModule),
  canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
