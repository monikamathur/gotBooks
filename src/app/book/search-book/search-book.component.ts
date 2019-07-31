import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {
  dtOptions: DataTables.Settings = {};

  constructor(private BookService: BookService, private toastr: ToastrService,) { 
    this.dtOptions = {
      searching: false
    };
    this.BookService.searchBook(this.searchTerm$)
    .subscribe(results => {
      this.filterData = JSON.parse(results['data']);
    });
  }
  filterData;
  searchTerm$ = new Subject<string>();

  ngOnInit() {
  }

}
