import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private BookService: BookService,
    private toastr: ToastrService) {
  }
  candidatesData: any;
  userData: any;
  ngOnInit() {
    this.getCandidates();

  }

  getCandidates() {
    this.BookService.getBook().subscribe((data) => {
      this.candidatesData = data;
    });
  }

  voteCandidates(id) {
    this.BookService.getBookById(id).subscribe((data) => {
      this.toastr.success('Your vote has been submitted successfully', 'Success');
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

}
