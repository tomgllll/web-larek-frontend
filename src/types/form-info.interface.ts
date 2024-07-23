/** Данные формы */
export interface IFormInfo {
	valid: boolean;
	errors: string[];
	address: string;
	payment: string;
	phone: string;
	email: string;
}