import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, FormBuilder, Validator, Validators, AbstractControl } from '@angular/forms';
import notie from 'notie';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  

  public userDetail; 

  public MatchPassword(AC: AbstractControl) {
    debugger;
    let password = AC.get('password').value; // to get value in input tag
    let conpassword = AC.get('conpassword').value; // to get value in input tag
     if(password != conpassword) {
         console.log('false');
         AC.get('conpassword').setErrors( {MatchPassword: true} )
     } else {
         console.log('true');
         return null
     }
 }
 
  constructor(private router: Router, private http: HttpClient,user:FormBuilder) {
    this.userDetail = new FormGroup({
      name: new FormControl(null,Validators.required),
      phone: new FormControl(null,Validators.compose([Validators.required])),
      referral: new FormControl(),
      email: new FormControl(null,Validators.email),
      password: new FormControl(null,Validators.compose([Validators.required, Validators.minLength(6)])),
      conpassword: new FormControl(null,Validators.required),
      bussinessrole: new FormControl(null,Validators.required),
      bussinesstype: new FormControl(null,Validators.required)
    }, {
      validators:this.MatchPassword // your validation method
    });
  }

  ngOnInit() {
  }


  public registerUser() {
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    var body = "name=" + this.userDetail.value.name + "&phone=" + this.userDetail.value.phone + "&referral=" + this.userDetail.value.referral
      + "&email=" + this.userDetail.value.email + "&password=" + this.userDetail.value.password + "&bussinessrole=" + this.userDetail.value.bussinessrole
      + "&bussinesstype=" + this.userDetail.value.bussinesstype;

    this.http.post("http://localhost:8012/api/register", body, options).subscribe((data) => {
      debugger;
      if (data.message == "Email Already Exist") {
          alert("Your Email Already Exist.");
        // notie.alert({ type:'warning', text: 'Your Email Already Exist.'})
      }
      
      else if (data.message = "user saved sucessfully") {
        notie.alert({ type: 'success', text: 'User Saved Sucessfully' })
        this.router.navigate(['/login']);
      }

    });

  }

} 
