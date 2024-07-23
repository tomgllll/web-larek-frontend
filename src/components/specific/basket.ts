import { Component } from '../base/component';
import { IEvents } from '../base/events';
import { createElement, ensureElement } from '../../utils/utils';
import { IBasketInfo } from '../../types';

export class Basket extends Component<IBasketInfo> {
	private listElement: HTMLElement;
	private readonly orderButton: HTMLButtonElement;
	private readonly totalElement: HTMLElement;

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this.orderButton = ensureElement<HTMLButtonElement>(
			'.basket__button',
			this.container,
		);

		this.orderButton.addEventListener('click', () => {
			events.emit('order:open');
		});

		this.listElement = ensureElement<HTMLElement>('.basket__list', this.container);
		this.totalElement = ensureElement<HTMLElement>('.basket__price', this.container);
	}

	get list(): HTMLElement[] {
		return Array.from(this.listElement.children).filter(node => node instanceof HTMLLIElement) as HTMLElement[];
	}

	set list(items: HTMLElement[]) {
		if (items.length) {
			this.listElement.replaceChildren(...items);
			this.setDisabled(this.orderButton, false);
		} else {
			this.listElement.replaceChildren(createElement<HTMLParagraphElement>('p', {
				textContent: 'Корзина пуста',
			}));
			this.setDisabled(this.orderButton, true);
		}
	}

	get total(): number {
		return parseInt(this.totalElement.textContent) || 0;
	}

	set total(total: number) {
		this.setText(this.totalElement, total + ' синапсов');
	}
}