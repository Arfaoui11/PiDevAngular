import {PostComment} from "./PostComment";

export class Likes {

  id!:number;
  nbrLikes!:number;
  createAt!:Date;
  post :  PostComment;
}
