import IUser from './IUser';

export default interface IActivateToken {
  activateToken: string;
  user: IUser;
}