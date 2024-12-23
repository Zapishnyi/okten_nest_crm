import IUser from './IUser';

export interface IUserCreate extends Pick<IUser, 'name' | 'surname' | 'email'> {
}