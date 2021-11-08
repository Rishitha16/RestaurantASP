import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public userForm!: FormGroup

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      fullname: [''],
      email: [''],
      password: [''],
      dob: ['']
    })
  }

  register() {
    this.http.post<any>("https://6167d7e1ba841a001727c43f.mockapi.io/user",this.userForm.value)
      .subscribe(res => {
        alert('Registered Successfully')
        this.userForm.reset()
        this.router.navigate(['login'])
        console.log(res)
      }, err => {
        alert('Something went wrong')
      })
  }
}