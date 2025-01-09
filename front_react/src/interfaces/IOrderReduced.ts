import IOrder from './IOrder';
/* eslint-disable @typescript-eslint/no-empty-interface */
export default interface IOrderReduced extends Omit<IOrder, 'comments' | 'manager_id' | 'utm' | 'msg'> {

}