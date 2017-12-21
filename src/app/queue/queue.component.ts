import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import swal from 'sweetalert2';


import { Food } from '../models/food';

import { from } from 'rxjs/observable/from';
import { query } from '@angular/core/src/animation/dsl';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css'],
  providers: [AngularFireAuth],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' },
  encapsulation: ViewEncapsulation.None
})



export class QueueComponent implements OnInit {
  orders: Observable<any[]>;
  name: any;
  email: any;
  user: any;
  state: '';
  title: 'TEES KITCHEN MENU PRICE LIST';
  data: any[];
  group: any[];
  checkout: any[] = [];
  ownersOrder: Observable<any[]>;
  filterargs = { owner: 'hello' };

  constructor(public af: AngularFireAuth, private router: Router, private afd: AngularFireDatabase) {
    this.orders = afd.list('/Orders/', ref => ref.limitToFirst(10)).valueChanges();
    this.user = this.af.authState;
    this.user.subscribe(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        this.filterargs.owner = this.email;
        this.ownersOrder = afd.list('/Orders', ref => ref.orderByChild('owner').equalTo(this.email).limitToFirst(1)).valueChanges();
        console.log('*********************************************************');
        console.log(this.orders);
        console.log(this.ownersOrder);
        console.log(user);
        console.log('*********************************************************');
      }
    });
   }

  ngOnInit() {
  }

  queue() {
    this.router.navigateByUrl('/order');
  }

  home() {
    this.router.navigateByUrl('/');
  }

  log(item) {
    console.log('Log Start');
    console.log(item);
    console.log('Log End');
  }
}
