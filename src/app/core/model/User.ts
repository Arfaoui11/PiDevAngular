import {Formation} from "./Formation";

export class User {

  id !: number;
  displayName!:string;
  firstName ! : string;
  lastName ! : string;
  phoneNumber !:number;
  priceconsultation!:number;
  email !:string;
  tarifHoraire !:number;
  profession!:string;
  salary! : number;
  age!:number;
  password: any;
  matchingPassword: any;

  isOnline: Boolean;



}
