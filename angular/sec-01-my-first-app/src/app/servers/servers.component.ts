import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  // selector: '.app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
    allowNewServer: boolean = false;
    severCreationStatus: string = 'No server was created';
    serverName = '';
    serverCreated = false
    servers = ['Server 1', 'Server 2']

    constructor() { 
        setTimeout(() => {
            this.allowNewServer = true;
        }, 2000);
    }

    ngOnInit(): void {
    }

    onCreateServer() {
        this.serverCreated = true;
        this.severCreationStatus = 'Server was created!'
        this.servers.push(this.serverName);
    }

    onUpdateServerName(name) {
        this.serverName = name;

    }

}
