import IUser from '../interfaces/IUser';

export type UserNoStatisticType = Omit<IUser, 'statistic'>