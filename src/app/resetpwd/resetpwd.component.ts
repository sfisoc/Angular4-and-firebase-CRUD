import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css'],
  providers: [AngularFireAuth],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' },
  encapsulation: ViewEncapsulation.None
})
export class ResetpwdComponent implements OnInit {

  state: '';
  error: any;

  constructor(public af: AngularFireAuth, private router: Router) {
    this.af.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/members');
      }
    });
  }


  onSubmit(formData) {
    if (formData.valid) {
      console.log(formData.value);
      firebase.auth().sendPasswordResetEmail(formData.value.email).then(
        (success) => {
          console.log(success);
          console.log('Pass');
          this.router.navigate(['/login']);
        }).catch(
        (err) => {
          console.log(err);
          this.error = err;
        });
    }
  }

  ngOnInit() {
  }

}
