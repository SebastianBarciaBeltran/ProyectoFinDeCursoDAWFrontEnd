import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminBodyComponent } from './pages/admin-body/admin-body.component';
import { AdminblogComponent } from './pages/adminblog/adminblog.component';
import { AdminclientesComponent } from './pages/adminclientes/adminclientes.component';
import { AdminhomeComponent } from './pages/adminhome/adminhome.component';
import { AdminmarcasComponent } from './pages/adminmarcas/adminmarcas.component';
import { AdminnewsletterComponent } from './pages/adminnewsletter/adminnewsletter.component';
import { AdminproductosComponent } from './pages/adminproductos/adminproductos.component';

const routes: Routes = [

  {
    path: '',
    component: AdminBodyComponent,
    children: [
       { path: '',           component: AdminhomeComponent },
       { path: 'home',       component: AdminhomeComponent },
       { path: 'brands',     component: AdminmarcasComponent },
       { path: 'products',   component: AdminproductosComponent },
       { path: 'users',      component: AdminclientesComponent },
       { path: 'newsletter', component: AdminnewsletterComponent },
       { path: 'blog', component: AdminblogComponent },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
