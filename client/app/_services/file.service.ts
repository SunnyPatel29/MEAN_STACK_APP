import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppConfig } from '../app.config';
import { User } from '../_models/index';

@Injectable()
export class FileService {
    constructor(private http: Http, private config: AppConfig) {
    }
    private makeFileRequest(url: string, params: string[], files: File[]): Observable {
        return Observable.create(observer => {
            let formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                formData.append("file", files[i], files[i].name);
            }

            xhr.open('POST', url, true);
            xhr.send(formData);
            return '';
        });
    }

    getAll(_id: string) {
        return this.http.get(this.config.apiUrl + '/files/all/' + _id, this.jwt()).map((response: Response) => response.json());
    }

    // getById(_id: string) {
    //     return this.http.get(this.config.apiUrl + '/users/' + _id, this.jwt()).map((response: Response) => response.json());
    // }

    // create(user: User) {
    //     return this.http.post(this.config.apiUrl + '/users/register', user, this.jwt());
    // }

    // update(user: User) {
    //     return this.http.put(this.config.apiUrl + '/users/' + user._id, user, this.jwt());
    // }

    delete(_id: string) {
        return this.http.delete(this.config.apiUrl + '/files/' + _id, this.jwt());
    }

    // private helper methods

    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}