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
    }

    isEmailExisting(email) {
    }
}