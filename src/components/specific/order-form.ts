import { IOrder } from '../../types';
import { Form } from '../base/form';
import { ensureAllElements } from '../../utils/utils';
import { IEvents } from '../base/events';

export class OrderForm extends Form<IOrder> {
	private paymentButtonElements: HTMLButtonElement[];
	private addressElement: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.paymentButtonElements = ensureAllElements('.button_alt', this.container);
		this.paymentButtonElements.forEach((button) => {
			button.addEventListener('click', () => {
				this.paymentButton = button.name;
				this.onInputChange('payment', button.name);
			});
		});
	}

	set address(value: string) {
		this.addressElement = this.container.elements.namedItem('address') as HTMLInputElement;
		this.addressElement.value = value;
	}

	set paymentButton(name: string) {
		this.paymentButtonElements.forEach(button => {
			this.toggleClass(button, 'button_alt-active', button.name === name);
		});
	}

}