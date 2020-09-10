import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isSalesperson: boolean;
  isStoreManager: boolean;
  isRegionManager: boolean;
  job_title: string;
  constructor() { }
  ngOnInit() {
    this.isRegionManager = true;
    this.isStoreManager = true;
    this.isSalesperson = true;
    // this.job_title = window.localStorage.getItem('job_title');
    // console.log(this.job_title);
    // if (this.job_title == 'region_manager') {
    //   this.isRegionManager = true;
    //   this.isStoreManager = false;
    //   this.isSalesperson = false;
    // }
    // else if (this.job_title == 'store_manager') {
    //   this.isRegionManager = false;
    //   this.isStoreManager = true;
    //   this.isSalesperson = false;
    // }
    // else if (this.job_title == null) {
    //   this.isRegionManager = false;
    //   this.isStoreManager = false;
    //   this.isSalesperson = false;
    // } else {
    //   this.isRegionManager = false;
    //   this.isStoreManager = false;
    //   this.isSalesperson = true;
    // }
  }
  changeColor0() {
    document.getElementById('cs0').style.opacity="1";
    document.getElementById('cs1').style.opacity="0.7";
    document.getElementById('cs2').style.opacity="0.7";
    document.getElementById('cs3').style.opacity="0.7";
  }
  changeColor1() {
    document.getElementById('cs0').style.opacity="0.7";
    document.getElementById('cs1').style.opacity="1";
    document.getElementById('cs2').style.opacity="0.7";
    document.getElementById('cs3').style.opacity="0.7";
  }
  changeColor2() {
    document.getElementById('cs0').style.opacity="0.7";
    document.getElementById('cs1').style.opacity="0.7";
    document.getElementById('cs2').style.opacity="1";
    document.getElementById('cs3').style.opacity="0.7";
  }
  changeColor3() {
    document.getElementById('cs0').style.opacity="0.7";
    document.getElementById('cs1').style.opacity="0.7";
    document.getElementById('cs2').style.opacity="0.7";
    document.getElementById('cs3').style.opacity="1";
  }
}
