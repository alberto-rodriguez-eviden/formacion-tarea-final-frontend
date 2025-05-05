import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client';
import { Observable, of } from 'rxjs';
import { ClientService } from '../client/client.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-clients-list',
    imports: [CommonModule, RouterLink],
    templateUrl: './clients-list.component.html'
})
export class ClientsListComponent implements OnInit {

    clientList: Client[] = [];

    constructor(private clientService: ClientService) { }

    ngOnInit(): void {
        this.clientService.getClients().subscribe(clientList => this.clientList = clientList);
    }

}
