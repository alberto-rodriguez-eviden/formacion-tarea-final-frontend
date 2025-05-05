import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client';
import { Observable, of } from 'rxjs';
import { ClientService } from '../client/client.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-clients-list',
    imports: [CommonModule, RouterLink, FormsModule],
    templateUrl: './clients-list.component.html'
})
export class ClientsListComponent implements OnInit {

    clientList: Client[] = [];

    filter: string = ""

    filteredList = ():Client[] => this.clientList.filter(client => {
        let clientName = (`${client.firstName} ${client.lastName}`).toLowerCase()
        let filterName = this.filter.toLowerCase()

        return clientName.includes(filterName)
    })

    constructor(private clientService: ClientService) { }

    ngOnInit(): void {
        this.clientService.getClients().subscribe(clientList => this.clientList = clientList);
    }

}
