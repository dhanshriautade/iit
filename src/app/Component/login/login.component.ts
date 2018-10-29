import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { authService } from '../service/auth.service';
import swal from 'sweetalert';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  button: boolean;
  hide = true;
  username: any;
  password: any;
  data: any;
  loginInput: LoginInput = new LoginInput()
  usernameFormControl = new FormControl('', [Validators.required,]);
  passwordFormControl = new FormControl('', [Validators.required,]);
  public loading = false;
  constructor(private router: Router, private authService: authService, private location: Location) {

  }
  ngOnInit() {
    this.LoggedIn();
  }
  LoggedIn() {

    var userData = localStorage.getItem('userData');
    if (userData) {
      this.router.navigate(['dashboard']);
    }
  }
  Login() {
    //this.loading = true;
    if (this.usernameFormControl.valid && this.passwordFormControl.valid) {
      this.authService.login(this.loginInput.toJSON()).subscribe(result => {
        //this.loading = false;
        console.log("Called API Result", result)

        if (!result.error) {
          this.data = result.result;
          console.log(this.data)
          localStorage.setItem('userData', JSON.stringify(this.data))
          let temp = JSON.parse(localStorage.getItem('systemCall'))
          console.log(temp)
          temp['login_success'] = 'true'
          localStorage.setItem('systemCall', JSON.stringify(temp))
          swal({
            text: "Login Successfully"
          }).then(ok => {
            this.checkAnswar();
          })
          //localStorage.clear()
        }
        else if (result.error == true) { swal('Email id/Password is invalid!') }
        //  this.loading = false;
      }, error => {
        console.log("Called API Error", error)

      })
    }
    else {
      //this.loading = false;
      swal({
        text: "Please enter all the field!!!"
      })
    }
  }
  item: any = []
  checkAnswar() {
    swal({
      title: this.data.favourite_question,
      content: {
        element: "input",
        input: 'Answar',
        attributes: {
          placeholder: "Answar",
          //type: "password",
        },
      },
    }).then(doreject => {
      if (doreject) {
        this.item = [];
        this.item.push({
          answar: doreject,
          id: this.data.id
        })
        console.log(this.item)
        this.authService.checkAnswar(this.item).subscribe(res => {
          if (res.message == 'Correct answar') {
            swal({ text: "Correct answar" }).then(ok => {
              let temp = JSON.parse(localStorage.getItem('systemCall'))
              temp['answar'] = 'true'
              localStorage.setItem('systemCall', JSON.stringify(temp))
              this.router.navigate(['dashboard'])
            })
          }
          if (res.message == 'Wrong answar') {
            swal({ text: "Wrong answar" }).then(ok => {
              this.loginInput.email_id = null;
              this.loginInput.password = null;
              this.usernameFormControl.markAsUntouched();
              this.passwordFormControl.markAsUntouched();

            })
          }

        }, error => {
          swal("Something went wrong");
          console.log(error);
        })

      }
      else {
        swal("Enter Answar")
      }
    })
  }
  Register() {
    this.router.navigate(['register']);
  }
}
class LoginInput {
  email_id: string
  password: string
  toJSON() {
    let json = {}
    json = {
      email_id: this.email_id,
      password: this.password,
    }
    return json;
  }
}