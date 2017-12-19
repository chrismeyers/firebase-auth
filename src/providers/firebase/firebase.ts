import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

import { User } from "../../models/user";

@Injectable()
export class FirebaseProvider {

  private loggedIn: boolean;

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.loggedIn = user ? true : false;
      console.log(this.loggedIn, user);
    });
  }

  async login(user: User) {
    try {
      // By subscribing to the authState in the constructor, this.loggedIn will
      // automatically update upon authState changing (think pub/sub).
      await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      return true;
    }
    catch(e) {
      console.error(e);
      return false;
    }
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isLoggedIn() {
    // TODO: There is a timing problem here. The authState subscription is not
    // returning in time and this.loggedIn is still undefined.
    return this.loggedIn;
  }

}
