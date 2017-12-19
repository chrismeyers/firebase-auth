import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewCanEnter() {
    if(!this.firebaseProvider.isLoggedIn()) {
      this.navCtrl.setRoot('LoginPage');
    }
  }

  logout() {
    this.firebaseProvider.logout();
    this.navCtrl.setRoot('LoginPage');
  }

}
