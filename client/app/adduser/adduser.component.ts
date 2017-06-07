import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'adduser.component.html'
})

export class AddUserComponent {

    model: any = {};
    loading = false;
    currentUser:any;

    constructor(
        private router: Router,
        private userService: UserService,
       
        private alertService: AlertService) { 
        }


    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
            data => {
                this.alertService.success('User added successfully', true);
                this.router.navigate(['/users']);
            },
            error => {
                this.alertService.error(error._body);
                this.loading = false;
            });
    }
}
