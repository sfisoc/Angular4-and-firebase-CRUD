import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject  } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import swal from 'sweetalert2';


import { Food} from '../models/food';

import { from } from 'rxjs/observable/from';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [AngularFireAuth],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' },
  encapsulation: ViewEncapsulation.None
})
export class OrderComponent implements OnInit {

  name: any;
  email: any;
  user: any;
  state: '';
  title: 'TEES KITCHEN MENU PRICE LIST';
  data: any[];
  group: any[];
  checkout: any[] = [];
  order: any;
  uid: any;
  person: any;


  constructor(public af: AngularFireAuth, private router: Router, private afd: AngularFireDatabase) {

    // Databse object
    this.order = afd.list('/Orders');
    console.log(' Order Object' + this.order);

    // Static data
    this.data = new Array(5);
    this.group = new Array(5);

    this.group[0] = Food.Category.one;
    this.group[1] = Food.Category.two;
    this.group[2] = Food.Category.three;
    this.group[3] = Food.Category.four;
    this.group[4] = Food.Category.five;

    this.data[0] = Food.Burgers;
    this.data[1] = Food.ToastedSandwiches;
    this.data[2] = Food.Salads;
    this.data[3] = Food.Drinks;
    this.data[4] = Food.Other;




    this.user = this.af.authState;
    this.user.subscribe(user => {
    if (user) {
        console.log('*********************************************************');
        console.log(user);
        console.log('*********************************************************');
        this.name = user.displayName;
        this.email = user.email;
        this.uid = user.uid;
      }
    });
}

  ngOnInit() {

    // this.data = this.afd.list('/food');
    console.log(this.data);
  }

  queue() {
    this.router.navigateByUrl('/queue');
  }

  cart(item: any) {

    console.log(item);
    this.checkout.push(item);
  }

  cartout(item: any) {

    const index: number = this.checkout.indexOf(item);
    if (index !== -1) {
      this.checkout.splice(index, 1);
    }

    console.log(this.checkout);
  }

  submitOrder() {
    console.log('Order Submitted ');
    alert('Order Taken, rediecting to queue for progress');
    this.person = this.afd.list('/Orders').push({});
    // this.order.child(uid).set({ owner: uid, state: 'received', list: this.checkout });
    this.person = this.order.push();
    console.log(this.person);
    this.person.set({ owner: this.email, state: 'received', list: this.checkout, key: this.person.key });

    this.queue();
  }


}
