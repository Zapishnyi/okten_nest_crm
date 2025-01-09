import IOrder from './IOrder';
/* eslint-disable @typescript-eslint/no-empty-interface */
export default interface IOrderEdit extends Omit<IOrder, 'comments' | 'manager_id' | 'id' | 'manager' | 'utm' | 'msg' | 'created_at'> {

}