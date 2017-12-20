import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import 'rxjs/add/operator/first';

@Injectable()
export class FirebaseProvider {

  constructor(private afAuth: AngularFireAuth) {
  }

  async loginEmailPassword(email: string, password: string) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      return result && result.email && result.uid;
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
    // Adding the first() operator completes the promise with the first emitted
    // value. See: https://stackoverflow.com/a/41885407
    return this.afAuth.authState.first().toPromise().then((user) => {
      return user != null;
    }).catch((err) => {
      return false;
    });
  }

}
