import { IProduct } from './product.interface';
import { IShoppingInfo } from './shopping-info.interface';
import { IFormError } from './form-error.interface';
import { IEvents } from '../components/base/events';

/** Общие данные о магазине */
export interface IAppInfo {
	catalog: IProduct[];
	basket: IProduct[];
	order: IShoppingInfo;
	formError: IFormError;
	events: IEvents;
}