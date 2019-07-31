import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private BookService: BookService,
    private toastr: ToastrService, private router: Router) {
  }
  booksData: any;
  userData: any;
  ngOnInit() {
    this.getBooks();

  }

  getBooks() {
    this.BookService.getBook().subscribe((data) => {
      this.booksData = data['data'];
    });
  }

  editBook(id) {
    this.router.navigate(['/add', { isEdit: true, id: id }]);
  }

  deleteBook(id) {
    this.BookService.deleteBook(id).subscribe((data) => {
      this.toastr.success(data['message'], 'Success');
      this.getBooks();
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

}
