import { Component } from './component';
import { IEvents } from './events';
import { ensureElement } from '../../utils/utils';
import { IFormInfo } from '../../types';

export class Form<T> extends Component<IFormInfo> {
	protected submitButton: HTMLButtonElement;
	protected contentError: HTMLElement;

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container);

		this.submitButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container,
		);
		this.contentError = ensureElement<HTMLElement>('.form__errors', this.container);


		this.container.addEventListener('input', (event: Event) => {
			const target = event.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (event: Event) => {
			event.preventDefault();
			this.events.emit(`${this.container.name}:submit`);
		});
	}


	/** Изменение данных */
	onInputChange(name: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(name)}:change`, {
			field: name,
			value,
		});
	}

	/** Установка состояния кнопки */
	set valid(value: boolean) {
		this.setDisabled(this.submitButton, !value);
	}

	/** Установка сообщения об ошибке */
	set errors(value: string) {
		this.setText(this.contentError, value);
	}

	/** Сброс значения всех полей формы */
	resetForm(): void {
		this.container.reset();
	}
}