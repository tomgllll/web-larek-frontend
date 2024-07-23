import { IShoppingInfo } from './shopping-info.interface';

export type IShoppingPost = IShoppingInfo & {
	total: number;
	items: string[];
}