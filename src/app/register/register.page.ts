import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidator } from '../validators/password.validator';
import { ApiService } from '../services/api/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  data = {
    fullname: '',
    username: '',
    password: '',
    email: '',
    contact_number: ''
  }
  registerForm: FormGroup;
  matching_passwords: FormGroup;

  validation_messages_register = {
    'username': [
      { type: 'required', message: 'Username is required' },
      { type: 'minlength', message: 'Username must be at least 2 characters long' },
      { type: 'pattern', message: 'Username is invalid' }
    ],
    'fullname': [
      { type: 'required', message: 'Fullnameis required' },
      { type: 'minlength', message: 'Fullname must be at least 2 characters long' },
      { type: 'pattern', message: 'Fullname is invalid' }
    ],
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'contact_number': [
      { type: 'required', message: 'Phone number is required' },
      { type: 'pattern', message: 'Enter a valid phone number' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 6 characters long' },
      { type: 'pattern', message: 'At least 1 symbol & 1 uppercase letter' }
    ],
    'confirm_password': [
      { type: 'required', message: 'Confirm Password is required' }
    ],
    'matching_passwords': [
      { type: 'areNotEqual', message: 'Password mismatch' }
    ],
  };
// Validators.minLength(6),
// Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9]).{6,}$')

  constructor(
    public apiService: ApiService,
    public alertCtrl: AlertController
  ) {
    this.matching_passwords = new FormGroup({
      'password': new FormControl('', {
        validators: Validators.compose([
          Validators.required
        ])
      }),
      'confirm_password': new FormControl('', {
        validators: Validators.required
      })
    }, (formGroup: FormGroup) => {
      return PasswordValidator.areNotEqual(formGroup);
    });

    this.registerForm = new FormGroup({
      'username': new FormControl('', {
        validators: Validators.compose([
          Validators.required
        ])
      }),
      'fullname': new FormControl('', {
        validators: Validators.compose([
          Validators.required
        ])
      }),
      'email': new FormControl('', {
        validators: Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')
        ])
      }),
      'contact_number': new FormControl('', {
        validators: Validators.compose([
          Validators.required
        ])
      }),
      'matching_passwords': this.matching_passwords,
    });
  }

  ngOnInit() {
  }

  register() {
    console.log('register');
    this.apiService.register(this.data).then((response) => {
      console.log(response);
      this.presentSuccessAlert();
      this.reset();
    }).catch((err) => {
      console.log(err);
      this.presentFailAlert();
    });
  }

  async presentFailAlert(){
    const alert = await this.alertCtrl.create({
      subHeader:"Register Failed",
      message:"Sorry, please try again.",
      buttons:['OK']
    });
    await alert.present();
  }

  async presentSuccessAlert(){
    const alert = await this.alertCtrl.create({
      subHeader:"Registered successfully",
      message:"You can now login.",
      buttons:['OK']
    });
    await alert.present();
  }

  reset() {
    this.data = {
      fullname: '',
      username: '',
      password: '',
      email: '',
      contact_number: ''
    }

    this.registerForm.reset();
    this.matching_passwords.reset();
  }
}
