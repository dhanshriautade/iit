import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { Location } from '@angular/common';
import { authService } from '../service/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  button: boolean;
  hide = true;
  formdata: any = {}
  val_first_name = new FormControl('', [Validators.required,]);
  val_last_name = new FormControl('', [Validators.required,]);
  val_email_id = new FormControl('', [Validators.required,]);
  passwordFormControl = new FormControl('', [Validators.required,]);
  val_question = new FormControl('', [Validators.required,]);
  val_answar = new FormControl('', [Validators.required,]);
  userData: any;
  id: any;
  public loading = false;
  constructor(private location: Location, private authServise: authService) {
    this.userData = localStorage.getItem('userData')
    this.id = JSON.parse(this.userData).id;
    this.getData();
  }

  ngOnInit() {
  }

  getData() {
    this.authServise.selectProfileForEdit(this.id).subscribe(res => {
      if (!res.error) {
        this.formdata = res.result[0];
      }
    }, error => {
      swal("Something went wrong")
    })
  }
  Update() {
    if (this.val_answar.valid && this.val_email_id.valid && this.val_first_name.valid && this.val_last_name.valid && this.val_question.valid && this.passwordFormControl.valid) {
      this.authServise.updateProfile(this.formdata).subscribe(res => {
        if (!res.error) {
          swal("Profile updated successfully")
          let temp = JSON.parse(localStorage.getItem('systemCall'))
          temp['updateProfile'] = 'true'
          localStorage.setItem('systemCall', JSON.stringify(temp))
        }
      }, error => {
        swal("Something went wrong")
      })
    }
    else {
      this.val_answar.markAsTouched()
      this.val_email_id.markAsTouched()
      this.val_first_name.markAsTouched()
      this.val_last_name.markAsTouched()
      this.val_question.markAsTouched()
      this.passwordFormControl.markAsTouched()
      swal("Please enter required fields")
    }
  }

}
