import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers = {};
  
  constructor(protected http: HttpClient) { 
     this.headers = new HttpHeaders().set('app-id', '5f53d6a7e7ad4bbb29c81e5e');
  }
  

  getDataUsers() {
    return this.http.get('https://dummyapi.io/data/api/user', {headers: this.headers});
  }

  getDataPosts() {
    return this.http.get('https://dummyapi.io/data/api/post?page=1&limit=10', {headers: this.headers});
  }

  getCommentPost(postId){
    return this.http.get(`https://dummyapi.io/data/api/post/${postId}/comment`, {headers: this.headers});
  }

  getProfile(profileId){
    return this.http.get(`https://dummyapi.io/data/api/user/${profileId}`, {headers: this.headers});
  }

  getPostsByTag(tagName) {
    return this.http.get(`https://dummyapi.io/data/api/tag/${tagName}/post`, {headers: this.headers});
  }
}