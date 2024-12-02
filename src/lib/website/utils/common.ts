export default class common {
	static randomString(length?: number): string {
		length = length || 10;

		let result = '';
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		}

		return result;
	}

	static isInput(element: HTMLElement): boolean {
		const tagName = element && element.tagName ? element.tagName.toLowerCase() : '';

		return (
			tagName === 'input' ||
			tagName === 'select' ||
			tagName === 'textarea' ||
			element?.isContentEditable
		);
	}

	static isFocusable(element: HTMLElement): boolean {
		const tagName = element && element.tagName ? element.tagName.toLowerCase() : '';

		return (
			common.isInput(element) ||
			tagName === 'button' ||
			tagName === 'a' ||
			tagName === 'details' ||
			element?.tabIndex >= 0
		);
	}
}
