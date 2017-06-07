import { Component, OnInit } from '@angular/core';
import { User, File } from '../_models/index';
import { UserService, FileService } from '../_services/index';
import { AppConfig } from '../app.config';
@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    selector: "home"
})

export class HomeComponent implements OnInit {
    currentUser: User;
    files: File[] = [];

    constructor(private userService: UserService, private fileservice: FileService, private config: AppConfig) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(" this.currentUser._id", this.currentUser._id);
    }


    onChange(event) {
        console.log('onChange');
        var files = event.srcElement.files;
        console.log(files);
        this.fileservice.makeFileRequest(this.config.apiUrl + '/files/upload?userid=' + this.currentUser._id, [], files).subscribe((data) => {
            console.log('sent');
            this.loadAllFiles(this.currentUser._id);
        });
    }

    ngOnInit() {
        this.loadAllFiles(this.currentUser._id);
    }

    deleteFile(_id: string) {
        this.fileservice.delete(_id).subscribe(() => { this.loadAllFiles(this.currentUser._id) });
    }

    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }

    private loadAllFiles(_id: string) {
        this.fileservice.getAll(_id).subscribe(files => { this.files = files; });
    }
}