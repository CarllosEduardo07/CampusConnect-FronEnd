export interface Post {
  id: string;
  title: string;
  createdAt: string;
  text: string;
  profileId: number;
  // communityId: number;
}

export interface PostNew {
  title: string;
  text: string;
  profileId: number;
  communityId: number;
}
