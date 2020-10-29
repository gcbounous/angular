import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor() { }

  logStatusChange(status) {
    this.logStatus('A server status changed, new status:', status);
  }

  private logStatus(msg: string, status: string) {
  	console.log(msg + ' ' + status);
  }
}
