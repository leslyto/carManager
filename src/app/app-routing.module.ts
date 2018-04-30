import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component'
import { CreateComponent } from './create/create.component'

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create/:id', component: CreateComponent},
  { path: 'create', component: CreateComponent},
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
