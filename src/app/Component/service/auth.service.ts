import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class authService {
    constructor(private httpClient: HttpClient) { }

    login(param: any): Observable<any> {
        return this.httpClient.post(environment.login, param)
    }
    register(param: any): Observable<any> {
        return this.httpClient.post(environment.register, param)
    }
    checkAnswar(param: any): Observable<any> {
        return this.httpClient.post(environment.checkAnswar, param)
    }
    selectProfileForEdit(id): Observable<any> {
        return this.httpClient.get(environment.selectProfileForEdit + '/' + id)
    }
    updateProfile(param: any): Observable<any> {
        return this.httpClient.post(environment.updateProfile, param)
    }
}