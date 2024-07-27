import { Form } from '../base/form';
import { IBuyerInfo } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class ContactsForm extends Form<IBuyerInfo> {
	private emailElement: HTMLInputElement;
	private phoneElement: HTMLInputElement;


	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}

	set email(value: string) {
		this.emailElement = this.container.elements.namedItem('email') as HTMLInputElement;
		this.emailElement.value = value;
	}

	set phone(value: string) {
		this.phoneElement = this.container.elements.namedItem('phone') as HTMLInputElement;
		this.phoneElement.value = value;
	}
}
