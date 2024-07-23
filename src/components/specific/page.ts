import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { IPage } from '../../types';

export class Page extends Component<IPage> {
	private counterElement: HTMLElement;
	private catalogElement: HTMLElement;
	private basketElement: HTMLButtonElement;
	private wrapperElement: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.catalogElement = ensureElement<HTMLElement>('.gallery');
		this.wrapperElement = ensureElement<HTMLElement>('.page__wrapper');

		this.counterElement = ensureElement<HTMLElement>(
			`.header__basket-counter`,
		);

		this.basketElement = ensureElement<HTMLButtonElement>(
			`.header__basket`,
			container,
		);

		this.basketElement.addEventListener(`click`, () => {
			this.events.emit(`basket:open`);
		});

	}

	set catalog(items: HTMLElement[]) {
		this.catalogElement.replaceChildren(...items);
	}

	set counter(value: number) {
		this.setText(this.counterElement, String(value));
	}

	set locked(value: boolean) {
		this.toggleClass(this.wrapperElement, 'page__wrapper_locked', value);
	}
}