export type IMsgType =
  | 'connection'
  | 'message'
  | 'join'
  | 'leave'
  | 'available';
export interface IMsg {
  type: IMsgType;
  message: string;
  id: string;
}
