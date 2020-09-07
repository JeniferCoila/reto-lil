import { Injectable } from '@angular/core';
import { ApiService } from '../api/api';
import { BehaviorSubject } from 'rxjs';
import { userCommentPost, userProfileData } from "src/app/home/postInterface";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  commentList : userCommentPost[];
  profileData: userProfileData;

  private postCommentsSource = new BehaviorSubject([]);
  currentPostComments = this.postCommentsSource.asObservable();

  private emptyVarSource = new BehaviorSubject(false);
  currentEmptyVar = this.emptyVarSource.asObservable();

  private emptyProfDataSource = new BehaviorSubject(false);
  currentEmptyProfData = this.emptyProfDataSource.asObservable();

  private profileDataSource = new BehaviorSubject({});
  currentProfileData = this.profileDataSource.asObservable();

  constructor(private apiService: ApiService) {


  }

  sendIdPost(id) {
    this.apiService.getCommentPost(id).subscribe(res => {
      this.commentList = Array.from(res['data']);
      this.emptyVarSource.next(false);
      this.postCommentsSource.next(this.commentList);
      this.commentList = [];
    });
  }
  sendIdProfile(id){
    this.apiService.getProfile(id).subscribe(res => {
      this.emptyProfDataSource.next(false);
      this.profileData = Object.assign(res);
      this.profileDataSource.next(this.profileData);
    });
  }

  cleanVariables() {
  this.emptyVarSource.next(true);
  }

  
  cleanVariablesProfile() {
    this.emptyProfDataSource.next(true);
    }

}
