export default interface IOrdersStatusStatistic {
  [key: string]: number;
  In_work: number;
  New: number;
  Agree: number;
  Disagree: number;
  Dubbing: number;
  Total: number;
}