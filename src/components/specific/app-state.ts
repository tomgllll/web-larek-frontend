import {
	IProduct,
	IShoppingInfo,
	IFormError,
	IAppInfo,
} from '../../types';
import { IEvents } from '../base/events';

export class AppState {
	catalog: IProduct[] = [];
	basket: IProduct[] = [];
	order: IShoppingInfo = {
		payment: '',
		address: '',
		email: '',
		phone: '',
	};
	orderErrors: IFormError = {};

	constructor(data: Partial<IAppInfo>, protected events: IEvents) {
		Object.assign(this, data);
	}

	setProductList(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	addToBasket(item: IProduct): void {
		this.basket.push(item);
		this.emitChanges('basket:changed', this.basket);

	}

	deleteFromBasket(item: IProduct) {
		this.basket = this.basket.filter((basketItem) => basketItem.id !== item.id);
		this.emitChanges('basket:changed', this.basket);
	}

	isInBasket(item: IProduct) {
		return this.basket.some((basketItem) => {
			return basketItem.id === item.id;
		});
	}

	getBasketId() {
		return this.basket.map((item) => item.id);
	}

	getNumberBasket(): number {
		return this.basket.length;
	}

	getTotalBasket(): number {
		return this.basket.reduce((total, item) => {
			return total + ( item.price || 0 );
		}, 0);
	}

	cleanBasket() {
		this.basket = [];
		this.emitChanges('basket:changed', this.basket);
	}

	setField(field: keyof IShoppingInfo, value: string) {
		this.order[field] = value;
		if (field === 'address' || field === 'payment') {
			this.setOrderErrors();
		}

		if (field === 'phone' || field === 'email') {
			this.setContactsErrors();
		}
	}

	setOrderErrors() {
		const errors: IFormError = {};
		if (!this.order.payment) {
			errors.payment = 'Выберите способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Укажите адрес';
		}
		this.orderErrors = errors;
		this.events.emit('formErrors:change', this.orderErrors);
		return Object.keys(errors).length === 0;
	}


	setContactsErrors() {
		const errors: IFormError = {};

		const validateEmail = (email: string): boolean => {
			const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
			return emailRegex.test(email);
		};

		const validatePhone = (phone: string): boolean => {
			const phoneRegex = /^\+?[1-9]\d{1,14}$/;
			return phoneRegex.test(phone);
		};

		if (!this.order.phone) {
			errors.phone = 'Укажите телефон';
		} else if (!validatePhone(this.order.phone)) {
			errors.phone = 'Некорректный формат телефона';
		}

		if (!this.order.email) {
			errors.email = 'Укажите email';
		} else if (!validateEmail(this.order.email)) {
			errors.email = 'Некорректный формат email';
		}

		this.orderErrors = errors;
		this.events.emit('formErrors:change', this.orderErrors);
		return Object.keys(errors).length === 0;
	}

	private emitChanges(event: string, payload?: object) {
		this.events.emit(event, payload ?? {});
	}
}