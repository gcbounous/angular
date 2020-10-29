import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ServersService } from '../servers.service';
import { Subscription, Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/can-deactivate-guard.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  paramSubscription: Subscription;
  queryParamSubscription: Subscription;

  constructor (private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    let id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;

    this.paramSubscription = this.route.params.subscribe(
      (params: Params) => { 
        this.server = this.serversService.getServer(+params['id']);
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;
      }
    );

    this.queryParamSubscription = this.route.queryParams.subscribe(
      (queryPerams: Params) => { this.allowEdit = queryPerams['allowEdit'] == 'true'; }
    );

    // console.log(this.route.snapshot.queryParams);
    // console.log(this.route.snapshot.fragment);
    // this.route.queryParams.subscribe();
    this.route.fragment.subscribe();
    
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit){
      return true;
    }

    if ((this.serverName != this.server.name || this.serverStatus != this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard your changes?');
    } else {
      return true;
    }
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['../'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }

}
