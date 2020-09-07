import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private API_KEY = 'AIzaSyAKlOzRd2KRpN-jNcrGJuWqHqJiLfj33oU';

    constructor(private http: HttpClient) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp',
                                {
                                    email : email,
                                    password : password,
                                    returnSecureToken : true
                                },
                                { params: {'key': this.API_KEY } }
                            ).pipe(
                                catchError(
                                    errorResp => { 
                                        console.log(errorResp);
                                        let errorMessage = 'An unknown error occured.';
                                        
                                        if (errorResp.error && errorResp.error.error) {
                                            switch (errorResp.error.error.message) {
                                                case 'EMAIL_EXISTS':
                                                    errorMessage = 'This e-mail already exists!'
                                                    break;
                                                case 'INVALID_EMAIL':
                                                    errorMessage = 'This e-mail in invalid! Please enter a valid email.'
                                                    break;
                                            }
                                        }
                                        
                                        return throwError(errorMessage);
                                })
                            );
    }
}

interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}
