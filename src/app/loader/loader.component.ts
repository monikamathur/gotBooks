import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs";
import { LoaderService } from '../loader.service'

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  loading: boolean = false;
  loadingSubscription: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loadingSubscription = this.loaderService.loadingStatus.subscribe((value) => {
      this.loading = value;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription.unsubscribe();
  }


}
