import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { DashboardPage } from '../dashboard/dashboard.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  //refer swagger
  data = {
    userName: '',
    password: ''
  }

  loginForm: FormGroup;

  validation_messages_login = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'pattern', message: 'Enter a valid username' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters' }
    ]
  };

  constructor(
    public router: Router,
    public apiService: ApiService
  ) {
    this.loginForm = new FormGroup({
      'username': new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      'password': new FormControl('', Validators.compose([
        Validators.required,
        // Validators.minLength(6)
      ]))
    });
  }

  ngOnInit() {
  }

  login() {
    console.log('login');

    // then this.data tu send dalam ni
    this.apiService.login(this.data).then(response => {
      console.log('if http status 2xx come here', response);
      this.router.navigateByUrl('/dashboard');

    }).catch(error => {
      console.log('if http status 4xx/5xx come here', error);

    })
  }

}
