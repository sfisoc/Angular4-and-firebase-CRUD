import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [AngularFireAuth],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' }
})

export class MembersComponent implements OnInit {
  name: any;
  email: any;
  user: any;
  state:  '';
  title: 'TEES KITCHEN MENU PRICE LIST';

  constructor(public af: AngularFireAuth, private router: Router) {

    this.user = this.af.authState;
      this.user.subscribe(user => {
        if (user) {
        console.log('*********************************************************');
        console.log(user);
        console.log('*********************************************************');
        this.name = user.displayName;
        this.email = user.email;
      }
    });

  }

  logout() {
    this.af.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }

  order() {
    this.router.navigateByUrl('/order');
  }

  queue() {
    this.router.navigateByUrl('/queue');
  }


  process() {
    this.router.navigateByUrl('/process');
  }

  ngOnInit() {
  }

}
