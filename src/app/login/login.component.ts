import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { moveIn } from '../router.animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  providers: [AngularFireAuth],
  host: { '[@moveIn]': '' },
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  error: any;
  constructor(public af: AngularFireAuth, private router: Router) {


    this.af.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }

  loginFb() {
    this.af.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then(
      (success) => {
        this.router.navigate(['/members']);
      }).catch(
      (err) => {
        this.error = err;
      });
  }

  loginGoogle() {
    this.af.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(
      (success) => {
        this.router.navigate(['/members']);
      }).catch(
      (err) => {
        this.error = err;
      });
  }


  ngOnInit() {
  }

}
