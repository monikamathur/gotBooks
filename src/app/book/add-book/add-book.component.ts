import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../book.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  addBookForm: FormGroup;
  submitted = false;
  isEdit;
  constructor(private formBuilder: FormBuilder, private BookService: BookService,
    private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.addBookForm = this.formBuilder.group({
      name: ['', Validators.required],
      isbn: ['', Validators.required],
      auther: ['', Validators.required],
      country: ['', Validators.required],
      number_of_pages: ['', Validators.required],
      publisher: ['', Validators.required],
      release_date: ['', Validators.required]
    });

    let id = this.route.snapshot.paramMap.get('id');
    this.isEdit = this.route.snapshot.paramMap.get('isEdit');

    this.isEdit && this.getBook(id)
  }

  // convenience getter for easy access to form fields
  get f() { return this.addBookForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addBookForm.invalid) {
      return;
    }
    if(this.isEdit){
      this.editBook();
    }else{
      this.addBook();
    }
  }
 
  addBook(){
    this.BookService.addBook(this.addBookForm.value).subscribe((data) => {
      this.toastr.success('Your book has been added successfully', 'Success');
      this.onReset();
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

  editBook(){
    this.BookService.editBook(this.addBookForm.value).subscribe((data) => {
      this.toastr.success('Your book has been added successfully', 'Success');
      this.onReset();
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

  onReset() {
    this.submitted = false;
    this.addBookForm.reset();
  }

  getBook(id) {
    this.BookService.getBookById(id).subscribe((data) => {
      this.addBookForm.patchValue(data);
      this.addBookForm.controls['_id'].setValue(id);
    }, (err) => {
      this.toastr.error(err.error.message, 'Error');
    });
  }

}
