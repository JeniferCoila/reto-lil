export interface postData {
  id: string;
  image: string;
  link: string;
  tags: Array<[]>;
  text: string;
  likes: number;
  publishDate: string;
  owner: userPostData;
}

export interface userPostData {
  email: string;
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
}

export interface userCommentPost {
  id: string;
  message: string;
  publishDate: string;
  owner: userPostData;
}

export interface userProfileData {
  dateOfBirth: string;
  email: string;
  firstName: string;
  gender: string;
  id: string;
  lastName: string;
  location: {
    street: string;
    city: string;
    timezone: string;
    state: string;
    country: string;
  };
  phone: string;
  picture: string;
  registerDate: string;
  title: string;
}
