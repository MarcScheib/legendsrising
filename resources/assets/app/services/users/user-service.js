import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

@inject(HttpClient)
export class UserService {
    constructor(httpClient) {
        this.httpClient = httpClient;
    }

    register(user) {
    }

    isUsernameExisting(username) {
        return this.httpClient.fetch('/api/user/usernameexist/' + username).then(response => response.json());
    }

    isEmailExisting(email) {
        return this.httpClient.fetch('/api/user/emailexist/' + email).then(response => response.json());
    }
}