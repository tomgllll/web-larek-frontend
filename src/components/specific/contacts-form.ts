import { Form } from '../base/form';
import { IBuyerInfo } from '../../types';
import { IEvents } from '../base/events';

export class ContactsForm extends Form<IBuyerInfo> {

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);
	}
}