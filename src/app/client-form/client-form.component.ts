import { Component, OnInit } from '@angular/core';
import { Client } from '../client/client';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../client/client.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-client-form',
    imports: [FormsModule, CommonModule],
    templateUrl: './client-form.component.html',
})
export class ClientFormComponent implements OnInit {

    clientId: number = 0;
    client: Client = new Client();

    title: string = "Crear cliente";
    buttonText: string = "Crear";

    errors: string[] = []

    constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            this.clientId = params['id'] || 0;
            this.title = this.clientId > 0 ? "Editar cliente" : "Crear cliente"
            this.buttonText = this.clientId > 0 ? "Guardar" : "Crear"

            if (this.clientId > 0) {
                this.clientService.getClient(this.clientId).subscribe(client => this.client = client)
            }
        })
    }

    public save(): void {
        if (this.clientId > 0) {
            this.edit()
        } else {
            this.create()
        }
    }

    private create(): void {
        this.clientService.createClient(this.client).subscribe({
            next: _ => {
                this.router.navigate(['/clients'])
                Swal.fire({
                    title: "Cliente creado",
                    text: "El cliente se ha creado con éxito.",
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
            },
            error: error => {
                if (error.status == 400) {
                    this.errors = error.error.errors
                }
            }
        })
    }

    private edit(): void {
        this.clientService.updateClient(this.client).subscribe({
            next: _ => {
                this.router.navigate(['/clients'])
                Swal.fire({
                    title: "Cliente creado",
                    text: "El cliente se ha actualizado con éxito.",
                    icon: 'success',
                    timer: 2000,
                    showConfirmButton: false,
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
            },
            error: error => {
                if (error.status == 400) {
                    this.errors = error.error.errors
                }
            }
        })
    }

}
