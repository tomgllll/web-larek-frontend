import { Component } from './component';
import { IEvents } from './events';
import { ensureElement } from '../../utils/utils';
import { IModalInfo } from '../../types';

export class Modal extends Component<IModalInfo> {
	protected closeButtonElement: HTMLButtonElement;
	protected contentElement: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this.closeButtonElement = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container,
		);
		this.contentElement = ensureElement<HTMLElement>('.modal__content', container);

		this.container.addEventListener('click', this.close.bind(this));
		this.closeButtonElement.addEventListener('click', this.close.bind(this));
		this.contentElement.addEventListener('click', (event) => event.stopPropagation());
	}

	set content(value: HTMLElement) {
		this.contentElement.replaceChildren(value);
	}

	open() {
		this.toggleModal();
		document.addEventListener('keydown', this.handleEscape);
		this.events.emit('modal:open');
	}

	close() {
		this.toggleModal(false);
		document.removeEventListener('keydown', this.handleEscape);
		this.content = null;
		this.events.emit('modal:close');
	}

	render(data: IModalInfo): HTMLElement {
		super.render(data);
		this.content = data.content;
		this.open();
		return this.container;
	}

	private toggleModal(state: boolean = true) {
		this.toggleClass(this.container, 'modal_active', state);
	}

	private handleEscape = (evt: KeyboardEvent) => {
		if (evt.key === 'Escape') {
			this.close();
		}
	};
}