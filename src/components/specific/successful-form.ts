import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ISuccessfulFormInfo } from '../../types';

export class SuccessfulForm extends Component<ISuccessfulFormInfo> {
	private closeButtonElement: HTMLButtonElement;
	private descriptionElement: HTMLElement;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);

		this.descriptionElement = ensureElement<HTMLButtonElement>(
			'.order-success__description',
			this.container,
		);

		this.closeButtonElement = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container,
		);

		this.closeButtonElement.addEventListener('click', () => events.emit('success:finish'));
	}

	set total(value: number) {
		this.setText(this.descriptionElement, `Списано ${value} синапсов `);
	}
}