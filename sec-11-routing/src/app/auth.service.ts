import { Injectable, EventEmitter, OnInit } from '@angular/core';

/**
 * Service that emulates a back end login/logout service
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    private loggedIn = false;

    authEvent = new EventEmitter<boolean>();

    constructor() { }

    ngOnInit() {
        this.authEvent.emit(this.loggedIn);
    }

    isAuthenticated() {
        const promise = new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    this.authEvent.emit(this.loggedIn);
                    resolve(this.loggedIn);
                }, 800);
            }
        );
        return promise;
    }

    login() {
        this.loggedIn = true;
        return this.isAuthenticated();
    }

    logout() {
        this.loggedIn = false;
        return this.isAuthenticated();
    }

}