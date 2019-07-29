import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book/book.component';
import { AddBookComponent } from './book/add-book/add-book.component';



const routes: Routes = [
  { path: '', component: BookComponent,},
  {
    path: 'book',
    component: BookComponent,
    children: [
      {
        path: 'add',
        component: AddBookComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
