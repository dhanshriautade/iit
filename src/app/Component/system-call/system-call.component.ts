import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-call',
  templateUrl: './system-call.component.html',
  styleUrls: ['./system-call.component.css']
})
export class SystemCallComponent implements OnInit {
  UserData: any = []
  keyData:any=[]
  constructor() {
    this.UserData = JSON.parse(localStorage.getItem('systemCall'))
    console.log(this.UserData)
    for (let key in this.UserData) {
      this.keyData.push(key)
    }
    console.log(this.keyData)
  }

  ngOnInit() {
  }

}
