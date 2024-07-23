import { Component } from '../base/component';
import { IProduct, IProductActions } from '../../types';
import { ensureElement } from '../../utils/utils';

const ALL_CATEGORIES: Record<string, string> = {
	'софт-скил': 'soft',
	'хард-скил': 'hard',
	'другое': 'other',
	'кнопка': 'button',
	'дополнительное': 'additional',
};

export class Product extends Component<IProduct> {
	private indexElement?: HTMLElement;
	private descriptionElement?: HTMLElement;
	private imageElement?: HTMLImageElement;
	private titleElement: HTMLElement;
	private categoryElement?: HTMLElement;
	private priceElement: HTMLElement;
	private buttonElement?: HTMLButtonElement;

	constructor(protected blockName: string, container: HTMLElement, actions?: IProductActions) {
		super(container);
		this.indexElement = this.container.querySelector('.basket__item-index');
		this.descriptionElement = this.container.querySelector(`.${blockName}__text`);
		this.imageElement = this.container.querySelector(`.card__image`);
		this.titleElement = ensureElement<HTMLElement>(`.${blockName}__title`, this.container);
		this.priceElement = ensureElement<HTMLElement>(`.${blockName}__price`, container);
		this.categoryElement = this.container.querySelector(`.card__category`);
		this.buttonElement = this.container.querySelector(`.${blockName}__button`);

		if (actions?.onClick) {
			if (this.buttonElement) {
				this.buttonElement.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set description(value: string) {
		this.setText(this.descriptionElement, value);
	}

	set image(value: string) {
		this.setImage(this.imageElement, value, this.title);
	}

	set title(value: string) {
		this.setText(this.titleElement, value);
	}

	get title(): string {
		return this.titleElement.textContent || '';
	}

	set category(value: string) {
		Object.values(ALL_CATEGORIES).forEach((category) => {
			this.toggleClass(this.categoryElement, `card__category_${ALL_CATEGORIES[value]}`, false);
		});
		this.toggleClass(this.categoryElement, `card__category_${ALL_CATEGORIES[value]}`, true);
		this.setText(this.categoryElement, value);
	}

	set price(value: number | null) {
		if (value === null) {
			this.setDisabled(this.buttonElement, true);
			this.setText(this.buttonElement, 'Нельзя купить');
			this.setText(this.priceElement, 'Бесценно');
		} else {
			this.setText(this.priceElement, `${value} синапсов`);
		}
	}

	set inBasket(isInBasket: boolean) {
		this.setText(this.buttonElement, isInBasket ? 'Убрать' : 'В корзину');
	}

	set index(value: number) {
		this.setText(this.indexElement, value);
	}
}