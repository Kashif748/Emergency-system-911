import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-attempts',
  templateUrl: './login-attempts.component.html',
  styleUrls: ['./login-attempts.component.scss']
})
export class LoginAttemptsComponent implements OnInit {
  formView = false;
  constructor() { }

  ngOnInit(): void {
  }

}
