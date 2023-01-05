import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ApiService } from './api.service';
import { urlModel } from './models/urlModel';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  originalUrl:string = "";
  shortenUrl:string = "";
  urls:urlModel[] = [];

  constructor(
    private primengConfig: PrimeNGConfig, 
    private apiService: ApiService,
    private messageService: MessageService
  ) {
    
  }


  ngOnInit() {
    this.primengConfig.ripple = true;

    this.apiService.getAllUrls().subscribe((data) => {
      this.urls = data.urls;
      console.log(this.urls);
    }, err => {

    })
  }


  makeShortenUrl() {
    this.apiService.makeShortUrl(this.originalUrl).subscribe((data) => {
      this.shortenUrl = data.url.shortUrl;
      let isSame = false;
      this.urls.forEach((url) => {
        if (url._id == data.url._id) {
          isSame = true;
        }
      })
      if (!isSame) this.urls = [ data.url, ...this.urls ]
    }, err => {
      console.log(err)
      this.messageService.add({ key:'alertApp', severity:'error', summary: err.error.message });
    })  
  }

  copyText() {
    navigator.clipboard.writeText(this.shortenUrl);
  }

  refresh() {
    this.originalUrl =  '';
    this.shortenUrl = '';
  }


}
