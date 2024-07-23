/** карточка товара */
export interface IProduct {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number
	index?: number;
}