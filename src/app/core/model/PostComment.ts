import {Likes} from "./likes";
import {DisLikes} from "./DisLikes";

export class PostComment {

  idComn!:number;
  message!:string;
  createAt!:Date;
  nbrLikes!:number;
  nbrDisLikes!:number;
  likes : Likes[];
  Dislikes:DisLikes[];
}
