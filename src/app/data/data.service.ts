import { Injectable, OnInit } from '@angular/core';
import { Client } from '../client/client';

@Injectable({
    providedIn: 'root'
})
export class DataService implements OnInit {

    clientList: Client[];

    constructor() {
        this.clientList = [];
    }

    ngOnInit(): void {
        this.clientList = [
            new Client(1, "Alberto", "Rodriguez", "alberto.rodriguez.external@eviden.com"),
            new Client(2, "Pepito", "Fulano", "pepefulano@gmail.com"),
            new Client(3, "Maria", "Española", "example@example.com")
        ]
    }
}
