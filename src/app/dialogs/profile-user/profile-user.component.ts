import { Component, OnInit } from "@angular/core";
import { userProfileData } from "src/app/home/postInterface";
import { UsersService } from "src/services/user/users.service";

@Component({
  selector: "app-profile-user",
  templateUrl: "./profile-user.component.html",
  styleUrls: ["./profile-user.component.css"],
})
export class ProfileUserComponent implements OnInit {
  profileData: userProfileData;
  loadProfile: boolean = false;

  constructor(private userService: UsersService) {
    this.userService.currentProfileData.subscribe((data) => {
      this.setProfile(data);
    });
    this.userService.currentEmptyProfData.subscribe((boolean) => {
      if (boolean) {
        this.loadProfile = false;
        this.profileData = <userProfileData>{};
      }
    });
  }

  ngOnInit(): void {}

  setProfile(data) {
    this.profileData = Object.assign(data);
    this.loadProfile = true;
  }
}
