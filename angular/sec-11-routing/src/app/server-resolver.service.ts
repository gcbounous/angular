import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ServersService } from './servers/servers.service';

@Injectable({ providedIn: 'root' })
export class ServerResolver implements Resolve<{id: number, name: string, status: string}> {

  constructor(private serversService: ServersService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<{id: number, name: string, status: string}> | Promise<{id: number, name: string, status: string}> | {id: number, name: string, status: string} {
    return this.serversService.getServer(+route.params['id']);
  }
}