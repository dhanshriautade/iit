import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userData: any;
  Name: any;
  constructor(private router: Router) {
    this.userData = localStorage.getItem('userData')
    let firstname = JSON.parse(this.userData).first_name;
    let lastname = JSON.parse(this.userData).last_name;
    this.Name = firstname + ' ' + lastname;

  }

  ngOnInit() {
  }

  signOut() {
    swal({

      text: 'Are you sure you wish to Sign Out?',
      dangerMode: true,
      buttons: ['Cancel', 'OK'],
    }).then(willsignout => {
      if (willsignout) {
        localStorage.clear();
        // window.location.reload()
        this.router.navigate(['mainPage']);
      }
    })

  }
  onclick(item){
    let temp = JSON.parse(localStorage.getItem('systemCall'))
    temp[item] = 'true'
    localStorage.setItem('systemCall', JSON.stringify(temp))
  }
}
