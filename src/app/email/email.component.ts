import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn } from '../router.animations';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css'],
  providers: [AngularFireAuth],
  animations: [moveIn(), fallIn()],
  host: { '[@moveIn]': '' },
})

export class EmailComponent implements OnInit {

  state:  '';
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
      this.af.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password).then(
        (success) => {
          console.log(success);
          this.router.navigate(['/members']);
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
