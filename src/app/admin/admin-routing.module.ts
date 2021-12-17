import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminBodyComponent } from './pages/admin-body/admin-body.component';
import { AdminclientesComponent } from './pages/adminclientes/adminclientes.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { AdminmarcasComponent } from './pages/adminmarcas/adminmarcas.component';
import { AdminproductosComponent } from './pages/adminproductos/adminproductos.component';

const routes: Routes = [

  {
    path: '',
    component: AdminBodyComponent,
    children: [
       { path: 'home',   component: AdminhomeComponent },
       { path: 'marcas', component: AdminmarcasComponent },
       { path: 'productos', component: AdminproductosComponent },
       { path: 'clientes', component: AdminclientesComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
