import { AxiosError } from 'axios';

import IErrorModified from '../interfaces/IErrorModified';
import IErrorResponse from '../interfaces/IErrorResponse';

import { navigateTo } from './navigate-to';

export const errorHandle = (e: any): IErrorModified => {

  const error = e as AxiosError<IErrorResponse>;
  let errorsParamsString: string;
  let message: string[];
  if (error.response?.data?.messages.length) {
    message = error.response.data.messages;
    console.error(error.response.data);
    errorsParamsString = error.response.data.messages.reduce((acc, e, i) => `${acc}${!i ? 'error' : '&error'}${i + 1}=${e}`, '?');
  } else {
    errorsParamsString = `?error=${error.message}`;
    message = [error?.message];
    console.error(error?.message);
  }
  if (error?.status !== 401) {
    navigateTo(`/error${errorsParamsString}`);
  }
  return { message, status: error?.status };
};