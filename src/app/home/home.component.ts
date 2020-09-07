import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/services/api/api";
import { postData } from "src/app/home/postInterface";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CommentsComponent } from "src/app/dialogs/comments/comments.component";
import { ProfileUserComponent } from "src/app/dialogs/profile-user/profile-user.component";

import { UsersService } from "src/services/user/users.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  postList: postData[];
  param1: any;
  param2: any;
  
  constructor(
    private apiService: ApiService,
    private userService: UsersService,
    private iconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    /*     iconRegistry.addSvgIcon(
      "thumbs-up",
      sanitizer.bypassSecurityTrustResourceUrl(
        "assets/img/examples/thumbup-icon.svg"
      )
    ); */

    this.route.queryParams.subscribe(params => {
      this.checkUrl(params);
      
  });


  }

  ngOnInit(): void {
    console.log('init')
  }

  checkUrl(params){

    if(params['tag']){
      this.param1 = params['tag'];
      this.getPostsTag(this.param1).subscribe((res) => {
        this.postList = Array.from(res["data"]);
      });
    } else {
      this.apiService.getDataPosts().subscribe((res) => {
        this.postList = Array.from(res["data"]);
        console.log(this.postList, "post");
      });
    }

  }

  getCommentsPostById(idPost) {
    this.userService.sendIdPost(idPost);
    const dialogRef = this.dialog.open(CommentsComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.userService.cleanVariables();
    });
  }
  getProfileById(idProfile) {
    this.userService.sendIdProfile(idProfile);
    const dialogRef = this.dialog.open(ProfileUserComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.userService.cleanVariablesProfile();
   });
  }

  formatDate(dateData) {
    let dateFormat = new Date(dateData);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = dateFormat.getFullYear();
    let month = months[dateFormat.getMonth()];
    let date = dateFormat.getDate();
    let hour = dateFormat.getHours();
    let min = dateFormat.getMinutes();
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min;
    return time;
  }

  getPostsByTags(tagName) {
    this.getPostsTag(tagName).subscribe((res) => {
      this.router.navigate(['/'], { queryParams: { tag: `${tagName}` } });
      this.postList = Array.from(res["data"]);
    });
  }

  getPostsTag(tagName){
    return this.apiService.getPostsByTag(tagName);
  }
}
