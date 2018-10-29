import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '../../../../node_modules/@angular/forms';
import { Location } from '@angular/common';
import { authService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  button: boolean;
  hide = true;
  formdata: any = {}
  val_first_name = new FormControl('', [Validators.required,]);
  val_last_name = new FormControl('', [Validators.required,]);
  val_email_id = new FormControl('', [Validators.required,]);
  passwordFormControl = new FormControl('', [Validators.required,]);
  val_question = new FormControl('', [Validators.required,]);
  val_answar = new FormControl('', [Validators.required,]);

  public loading = false;
  constructor(private location: Location, private authServise: authService) { }

  ngOnInit() {
  }
  Register() {
    if (this.val_answar.valid && this.val_email_id.valid && this.val_first_name.valid && this.val_last_name.valid && this.val_question.valid && this.passwordFormControl.valid) {
      this.authServise.register(this.formdata).subscribe(res => {
        if (!res.error) {
          swal({
            text:"Registration successfull"}).then(ok=>{
              this.location.back()
            })
        }
      },error=>{
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
