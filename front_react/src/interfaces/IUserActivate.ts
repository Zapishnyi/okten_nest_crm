import IUserSignIn from './IUserSignIn';

export default interface IUserActivate extends IUserSignIn {
  re_password: string;

}