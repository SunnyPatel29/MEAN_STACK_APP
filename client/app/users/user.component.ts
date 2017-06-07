import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { User, File } from '../_models/index';
import { UserService} from '../_services/index';
import { Router } from '@angular/router';
@Component({
    moduleId: module.id,
    templateUrl: 'user.component.html',
})

export class UserComponent implements OnInit {
    currentUser: User;
    files: File[] = [];

    constructor(private userService: UserService,  private router: Router) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
addUser(){
 this.router.navigate(['/adduser']);
}
    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(_id: string) {
        this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

   
}