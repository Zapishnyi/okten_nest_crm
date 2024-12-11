export default interface IErrorResponse {
  status_code: number;
  massages: string[];
  timestamp: Date;
  path: string;
}