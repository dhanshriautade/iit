import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  systemCalls:any={};
  login() {
    this.systemCalls.login='true';
    localStorage.setItem('systemCall',JSON.stringify(this.systemCalls));
    this.router.navigate(['login'])
  }
  register() {
    this.systemCalls.register='true';
    localStorage.setItem('systemCall',JSON.stringify(this.systemCalls));
    this.router.navigate(['register'])
  }
}
