import { IOrder } from './order.interface';
import { IBuyerInfo } from './buyer-info.interface';

/** общие данные для заказа */
export type IShoppingInfo = IOrder & IBuyerInfo;