import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book.service';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { LoaderService } from '../../loader.service'

@Component({
  selector: 'app-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  errorMessage :String = ''
  constructor(private BookService: BookService, private toastr: ToastrService, private loaderService: LoaderService) { 
    this.dtOptions = {
      searching: false
    };
    
    this.BookService.searchBook(this.searchTerm$)
    .subscribe(results => {
      this.loaderService.stopLoading();
      this.filterData = JSON.parse(results['data']);
    },
    (err)=>{
      this.loaderService.stopLoading();
      this.errorMessage = "No Records Found"
    },
    ()=>{
    }
  );
  }
  filterData;
  searchTerm$ = new Subject<string>();

  ngOnInit() {
  }
  
  startLoader(){
    this.loaderService.startLoading();
  }

}
