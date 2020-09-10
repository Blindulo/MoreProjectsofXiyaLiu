import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  name: string;
  salesperson_id: string;
  job_title:string;
  store_id:string;
  // isSalesperson: boolean;
  // isStoreManager: boolean;
  isRegionManager: boolean;
  constructor(
    private flashMessage: FlashMessagesService,
    private router: Router,
  ) {

  }

  ngOnInit() {
 
  }

}
