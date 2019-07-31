import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookComponent } from './book/book/book.component';
import { SearchBookComponent } from './book/search-book/search-book.component';
import { AddBookComponent } from './book/add-book/add-book.component';



const routes: Routes = [
  { path: '', component: BookComponent},
  {
    path: 'add',
    component: AddBookComponent
  },
  {
    path: 'list',
    component: BookComponent
  },
  {
    path: 'search',
    component: SearchBookComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
