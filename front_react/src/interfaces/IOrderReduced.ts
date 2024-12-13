import IOrder from './IOrder';

export default interface IOrderReduced extends Pick<IOrder, 'id' | 'email' | 'name' | 'phone' | 'age' | 'created_at' | 'surname' | 'course' | 'course_format' | 'course_type' | 'sum' | 'alreadyPaid' | 'status' | 'group' | 'manager'> {

}