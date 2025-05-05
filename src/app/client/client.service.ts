import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { Client } from "./client";
import { HttpClient } from "@angular/common/http";
import Swal from "sweetalert2";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root' 
}) export class ClientService {

    private endpoint: string = "http://localhost:8080/api/v1/clients"

    constructor(private http: HttpClient, private router: Router) { }

    getClients(): Observable<Client[]> {
        return this.http.get(this.endpoint).pipe(
            map(response => response as Client[])
        );
    }

    getClient(id: number): Observable<Client> {
        return this.http.get(`${this.endpoint}/${id}`).pipe(
            catchError(e => {
                Swal.fire({
                    title: "Se ha producido un error",
                    text: e.error.message,
                    icon: "error",
                    showConfirmButton: true,
                    allowEscapeKey: false,
                    allowOutsideClick: false
                })
                this.router.navigate(["/clients"])
                return throwError(() => e)
            }),
            map(response => response as Client),
        )
    }

    createClient(client: Client): Observable<Client> {
        return this.http.post(this.endpoint, client).pipe(
            catchError(e => {
                if (e.status != 400) {
                    Swal.fire({
                        title: "Se ha producido un error",
                        text: e.error.message,
                        icon: "error",
                        showConfirmButton: true,
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                }
                return throwError(() => e)
            }),
            map(response => response as Client)
        )
    }

    updateClient(client: Client): Observable<Client> {
        return this.http.put(`${this.endpoint}/${client.id}`, client).pipe(
            catchError(e => {
                if (e.status != 400) {
                    Swal.fire({
                        title: "Se ha producido un error",
                        text: e.error.message,
                        icon: "error",
                        showConfirmButton: true,
                        allowEscapeKey: false,
                        allowOutsideClick: false
                    })
                }
                return throwError(() => e)
            }),
            map(response => response as Client)
        )
    }

}