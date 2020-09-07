import { Component, OnInit } from "@angular/core";
import { UsersService } from "src/services/user/users.service";
import { ApiService } from "src/services/api/api";
import { userCommentPost } from "src/app/home/postInterface";

@Component({
  selector: "app-comments",
  templateUrl: "./comments.component.html",
  styleUrls: ["./comments.component.css"],
})
export class CommentsComponent implements OnInit {
  commentList: userCommentPost[];
  loadComment: boolean = false;
  constructor(private userService: UsersService) {

    this.userService.currentEmptyVar.subscribe((boolean) => {
      if (boolean) {
        this.loadComment = false;
        this.commentList = [];
      } else {
        this.userService.currentPostComments.subscribe((list) => {
          this.setComments(list);
        });
      }
    });
  }

  ngOnInit(): void {}

  setComments(list) {
    this.commentList = Array.from(list);
    this.loadComment = true;
  }
}
