import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';
import swal from 'sweetalert2';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css'],
  providers: [AngularFireAuth],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: { '[@moveIn]': '' },
  encapsulation: ViewEncapsulation.None
})
export class ProcessOrderComponent implements OnInit {

  orders: Observable<any[]>;
  name: any;
  email: any;
  user: any;
  title: 'TEES KITCHEN MENU PRICE LIST';
  data: any[];
  group: any[];
  checkout: any[] = [];
  states: any[];
  currentstate: {};
  person: any;
  state: '';

  constructor(public af: AngularFireAuth, private router: Router, private afd: AngularFireDatabase) {
    this.states = [{ name: 'Ordered items Not Avaible' }, { name: 'Processing' }, { name: 'Done' }];
    this.orders = afd.list('/Orders').valueChanges();
    this.user = this.af.authState;
    this.user.subscribe(user => {
      if (user) {
        this.name = user.displayName;
        this.email = user.email;
        console.log('*********************************************************');
        console.log(this.orders);
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


  processOrder(item, changeState) {
    console.log(item);
    console.log(item + ' -> ' + changeState.name);
  //  this.person = this.afd.list('/Orders', ref => ref.orderByChild('key').equalTo(item.key)).snapshotChanges();
    this.person  = this.afd.list('/Orders');
    console.log(this.person);
    const tmp = {
      state: changeState
    };

   const uid = item.key;

    this.person.update(uid, { owner: item.owner, state: changeState.name, list: item.list, key: item.key });

    //  .catch(error => console.log('Died' + error));

    // this.afd.child('Orders').
  //  this.person.set({owner: item.owner, state: changeState.name, list: item.list, key: item.key });


  }


}
