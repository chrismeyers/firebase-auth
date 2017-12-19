import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User } from '../../models/user';
import { FirebaseProvider } from '../../providers/firebase/firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private firebaseProvider: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  ionViewCanEnter() {
    if(this.firebaseProvider.isLoggedIn()) {
      this.navCtrl.setRoot('HomePage');
    }
  }

  login(user: User) {
    this.firebaseProvider.login(user).then(success => {
      if(success) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

}
