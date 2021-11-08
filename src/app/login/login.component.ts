import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string=""
  password:string=""
  public loginForm !: FormGroup
  
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    })
  }

  login(){
    this.http.get<any>("https://6167d7e1ba841a001727c43f.mockapi.io/user")
    .subscribe(res=>{
      console.log(res)
      let user = false;
      // res.find((a:any)=>{
      //  return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
      // });
      res.map((e:any)=>{
        console.log("Data "+this.email,this.password)
        if(e.email === this.email && e.password === this.password){
          console.log(e)
          user = true
        }
      })
      console.log(user)
      if(user){
        console.log(user)
        alert('Logined Successfully')
        this.loginForm.reset();
        this.router.navigate(['order'])
      }else{
        console.log(user)
        alert('User Not Found')
      }
    }, err=>{
      alert('Something went wrong')
    })
  }
}
