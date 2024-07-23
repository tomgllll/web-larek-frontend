import { Api, ApiListResponse } from '../base/api';
import { IProduct, ISuccessfulOrder, IShoppingPost } from '../../types';

export class SiteApi extends Api {
	private cdn: string;

	constructor(cdn: string, baseUrl: string, options: RequestInit = {}) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProduct[]> {
		return this.get('/product').then((data: ApiListResponse<IProduct>) =>
			data.items.map(item => ( {
				...item,
				image: `${this.cdn}${item.image}`,
			} )),
		);
	}

	postOrder(orderData: IShoppingPost): Promise<ISuccessfulOrder> {
		return this.post(`/order`, orderData).then((orderResult: ISuccessfulOrder) => orderResult);
	}
}