import { AxiosError } from 'axios';

import IErrorModified from '../interfaces/IErrorModified';
import IErrorResponse from '../interfaces/IErrorResponse';

export const errorHandle = (e: any): IErrorModified => {
  const error = e as AxiosError<IErrorResponse>;
  if (error.response) {
    console.error(error.response.data);
    return { message: error.response.data.messages, status: error.status };
  } else {
    console.error(error.message);
    return { message: [error.message], status: error.status };
  }
};