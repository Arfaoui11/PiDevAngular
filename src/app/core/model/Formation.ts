import {Quiz} from "./Quiz";
import {PostComment} from "./PostComment";
import {User} from "./User";

export class Formation {

  idFormation!:number;
  title!:string;
  level!:string;
  start!:Date;
  end!:Date;
  nbrHeures!:number;
  domain!:string;
  nbrMaxParticipant!:number;
  frais!:number;
  rating!:number;
  formateur!:User;


}
