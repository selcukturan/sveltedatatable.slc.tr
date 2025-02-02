import { fontFamily } from 'tailwindcss/defaultTheme';
import type { Config } from 'tailwindcss';

export default {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: ['dark'],
	theme: {
		container: {
			center: true
		},
		screens: {
			sm: '640px', // tablet
			md: '768px', // tablet landscape
			lg: '1024px', // laptop
			xl: '1280px' // desktop
		},
		extend: {
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--primary-500) / <alpha-value>)',
					50: 'hsl(var(--primary-50) / <alpha-value>)',
					100: 'hsl(var(--primary-100) / <alpha-value>)',
					200: 'hsl(var(--primary-200) / <alpha-value>)',
					300: 'hsl(var(--primary-300) / <alpha-value>)',
					400: 'hsl(var(--primary-400) / <alpha-value>)',
					500: 'hsl(var(--primary-500) / <alpha-value>)',
					600: 'hsl(var(--primary-600) / <alpha-value>)',
					700: 'hsl(var(--primary-700) / <alpha-value>)',
					800: 'hsl(var(--primary-800) / <alpha-value>)',
					900: 'hsl(var(--primary-900) / <alpha-value>)',
					950: 'hsl(var(--primary-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-primary-500) / <alpha-value>)',
						50: 'hsl(var(--token-primary-50) / <alpha-value>)',
						100: 'hsl(var(--token-primary-100) / <alpha-value>)',
						200: 'hsl(var(--token-primary-200) / <alpha-value>)',
						300: 'hsl(var(--token-primary-300) / <alpha-value>)',
						400: 'hsl(var(--token-primary-400) / <alpha-value>)',
						500: 'hsl(var(--token-primary-500) / <alpha-value>)',
						600: 'hsl(var(--token-primary-600) / <alpha-value>)',
						700: 'hsl(var(--token-primary-700) / <alpha-value>)',
						800: 'hsl(var(--token-primary-800) / <alpha-value>)',
						900: 'hsl(var(--token-primary-900) / <alpha-value>)',
						950: 'hsl(var(--token-primary-950) / <alpha-value>)'
					}
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary-500) / <alpha-value>)',
					50: 'hsl(var(--secondary-50) / <alpha-value>)',
					100: 'hsl(var(--secondary-100) / <alpha-value>)',
					200: 'hsl(var(--secondary-200) / <alpha-value>)',
					300: 'hsl(var(--secondary-300) / <alpha-value>)',
					400: 'hsl(var(--secondary-400) / <alpha-value>)',
					500: 'hsl(var(--secondary-500) / <alpha-value>)',
					600: 'hsl(var(--secondary-600) / <alpha-value>)',
					700: 'hsl(var(--secondary-700) / <alpha-value>)',
					800: 'hsl(var(--secondary-800) / <alpha-value>)',
					900: 'hsl(var(--secondary-900) / <alpha-value>)',
					950: 'hsl(var(--secondary-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-secondary-500) / <alpha-value>)',
						50: 'hsl(var(--token-secondary-50) / <alpha-value>)',
						100: 'hsl(var(--token-secondary-100) / <alpha-value>)',
						200: 'hsl(var(--token-secondary-200) / <alpha-value>)',
						300: 'hsl(var(--token-secondary-300) / <alpha-value>)',
						400: 'hsl(var(--token-secondary-400) / <alpha-value>)',
						500: 'hsl(var(--token-secondary-500) / <alpha-value>)',
						600: 'hsl(var(--token-secondary-600) / <alpha-value>)',
						700: 'hsl(var(--token-secondary-700) / <alpha-value>)',
						800: 'hsl(var(--token-secondary-800) / <alpha-value>)',
						900: 'hsl(var(--token-secondary-900) / <alpha-value>)',
						950: 'hsl(var(--token-secondary-950) / <alpha-value>)'
					}
				},
				tertiary: {
					DEFAULT: 'hsl(var(--tertiary-500) / <alpha-value>)',
					50: 'hsl(var(--tertiary-50) / <alpha-value>)',
					100: 'hsl(var(--tertiary-100) / <alpha-value>)',
					200: 'hsl(var(--tertiary-200) / <alpha-value>)',
					300: 'hsl(var(--tertiary-300) / <alpha-value>)',
					400: 'hsl(var(--tertiary-400) / <alpha-value>)',
					500: 'hsl(var(--tertiary-500) / <alpha-value>)',
					600: 'hsl(var(--tertiary-600) / <alpha-value>)',
					700: 'hsl(var(--tertiary-700) / <alpha-value>)',
					800: 'hsl(var(--tertiary-800) / <alpha-value>)',
					900: 'hsl(var(--tertiary-900) / <alpha-value>)',
					950: 'hsl(var(--tertiary-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-tertiary-500) / <alpha-value>)',
						50: 'hsl(var(--token-tertiary-50) / <alpha-value>)',
						100: 'hsl(var(--token-tertiary-100) / <alpha-value>)',
						200: 'hsl(var(--token-tertiary-200) / <alpha-value>)',
						300: 'hsl(var(--token-tertiary-300) / <alpha-value>)',
						400: 'hsl(var(--token-tertiary-400) / <alpha-value>)',
						500: 'hsl(var(--token-tertiary-500) / <alpha-value>)',
						600: 'hsl(var(--token-tertiary-600) / <alpha-value>)',
						700: 'hsl(var(--token-tertiary-700) / <alpha-value>)',
						800: 'hsl(var(--token-tertiary-800) / <alpha-value>)',
						900: 'hsl(var(--token-tertiary-900) / <alpha-value>)',
						950: 'hsl(var(--token-tertiary-950) / <alpha-value>)'
					}
				},
				quaternary: {
					DEFAULT: 'hsl(var(--quaternary-500) / <alpha-value>)',
					50: 'hsl(var(--quaternary-50) / <alpha-value>)',
					100: 'hsl(var(--quaternary-100) / <alpha-value>)',
					200: 'hsl(var(--quaternary-200) / <alpha-value>)',
					300: 'hsl(var(--quaternary-300) / <alpha-value>)',
					400: 'hsl(var(--quaternary-400) / <alpha-value>)',
					500: 'hsl(var(--quaternary-500) / <alpha-value>)',
					600: 'hsl(var(--quaternary-600) / <alpha-value>)',
					700: 'hsl(var(--quaternary-700) / <alpha-value>)',
					800: 'hsl(var(--quaternary-800) / <alpha-value>)',
					900: 'hsl(var(--quaternary-900) / <alpha-value>)',
					950: 'hsl(var(--quaternary-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-quaternary-500) / <alpha-value>)',
						50: 'hsl(var(--token-quaternary-50) / <alpha-value>)',
						100: 'hsl(var(--token-quaternary-100) / <alpha-value>)',
						200: 'hsl(var(--token-quaternary-200) / <alpha-value>)',
						300: 'hsl(var(--token-quaternary-300) / <alpha-value>)',
						400: 'hsl(var(--token-quaternary-400) / <alpha-value>)',
						500: 'hsl(var(--token-quaternary-500) / <alpha-value>)',
						600: 'hsl(var(--token-quaternary-600) / <alpha-value>)',
						700: 'hsl(var(--token-quaternary-700) / <alpha-value>)',
						800: 'hsl(var(--token-quaternary-800) / <alpha-value>)',
						900: 'hsl(var(--token-quaternary-900) / <alpha-value>)',
						950: 'hsl(var(--token-quaternary-950) / <alpha-value>)'
					}
				},
				surface: {
					DEFAULT: 'hsl(var(--surface-500) / <alpha-value>)',
					50: 'hsl(var(--surface-50) / <alpha-value>)',
					100: 'hsl(var(--surface-100) / <alpha-value>)',
					200: 'hsl(var(--surface-200) / <alpha-value>)',
					300: 'hsl(var(--surface-300) / <alpha-value>)',
					400: 'hsl(var(--surface-400) / <alpha-value>)',
					500: 'hsl(var(--surface-500) / <alpha-value>)',
					600: 'hsl(var(--surface-600) / <alpha-value>)',
					700: 'hsl(var(--surface-700) / <alpha-value>)',
					800: 'hsl(var(--surface-800) / <alpha-value>)',
					900: 'hsl(var(--surface-900) / <alpha-value>)',
					950: 'hsl(var(--surface-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-surface-500) / <alpha-value>)',
						50: 'hsl(var(--token-surface-50) / <alpha-value>)',
						100: 'hsl(var(--token-surface-100) / <alpha-value>)',
						200: 'hsl(var(--token-surface-200) / <alpha-value>)',
						300: 'hsl(var(--token-surface-300) / <alpha-value>)',
						400: 'hsl(var(--token-surface-400) / <alpha-value>)',
						500: 'hsl(var(--token-surface-500) / <alpha-value>)',
						600: 'hsl(var(--token-surface-600) / <alpha-value>)',
						700: 'hsl(var(--token-surface-700) / <alpha-value>)',
						800: 'hsl(var(--token-surface-800) / <alpha-value>)',
						900: 'hsl(var(--token-surface-900) / <alpha-value>)',
						950: 'hsl(var(--token-surface-950) / <alpha-value>)'
					}
				},
				info: {
					DEFAULT: 'hsl(var(--info-500) / <alpha-value>)',
					50: 'hsl(var(--info-50) / <alpha-value>)',
					100: 'hsl(var(--info-100) / <alpha-value>)',
					200: 'hsl(var(--info-200) / <alpha-value>)',
					300: 'hsl(var(--info-300) / <alpha-value>)',
					400: 'hsl(var(--info-400) / <alpha-value>)',
					500: 'hsl(var(--info-500) / <alpha-value>)',
					600: 'hsl(var(--info-600) / <alpha-value>)',
					700: 'hsl(var(--info-700) / <alpha-value>)',
					800: 'hsl(var(--info-800) / <alpha-value>)',
					900: 'hsl(var(--info-900) / <alpha-value>)',
					950: 'hsl(var(--info-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-info-500) / <alpha-value>)',
						50: 'hsl(var(--token-info-50) / <alpha-value>)',
						100: 'hsl(var(--token-info-100) / <alpha-value>)',
						200: 'hsl(var(--token-info-200) / <alpha-value>)',
						300: 'hsl(var(--token-info-300) / <alpha-value>)',
						400: 'hsl(var(--token-info-400) / <alpha-value>)',
						500: 'hsl(var(--token-info-500) / <alpha-value>)',
						600: 'hsl(var(--token-info-600) / <alpha-value>)',
						700: 'hsl(var(--token-info-700) / <alpha-value>)',
						800: 'hsl(var(--token-info-800) / <alpha-value>)',
						900: 'hsl(var(--token-info-900) / <alpha-value>)',
						950: 'hsl(var(--token-info-950) / <alpha-value>)'
					}
				},
				success: {
					DEFAULT: 'hsl(var(--success-500) / <alpha-value>)',
					50: 'hsl(var(--success-50) / <alpha-value>)',
					100: 'hsl(var(--success-100) / <alpha-value>)',
					200: 'hsl(var(--success-200) / <alpha-value>)',
					300: 'hsl(var(--success-300) / <alpha-value>)',
					400: 'hsl(var(--success-400) / <alpha-value>)',
					500: 'hsl(var(--success-500) / <alpha-value>)',
					600: 'hsl(var(--success-600) / <alpha-value>)',
					700: 'hsl(var(--success-700) / <alpha-value>)',
					800: 'hsl(var(--success-800) / <alpha-value>)',
					900: 'hsl(var(--success-900) / <alpha-value>)',
					950: 'hsl(var(--success-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-success-500) / <alpha-value>)',
						50: 'hsl(var(--token-success-50) / <alpha-value>)',
						100: 'hsl(var(--token-success-100) / <alpha-value>)',
						200: 'hsl(var(--token-success-200) / <alpha-value>)',
						300: 'hsl(var(--token-success-300) / <alpha-value>)',
						400: 'hsl(var(--token-success-400) / <alpha-value>)',
						500: 'hsl(var(--token-success-500) / <alpha-value>)',
						600: 'hsl(var(--token-success-600) / <alpha-value>)',
						700: 'hsl(var(--token-success-700) / <alpha-value>)',
						800: 'hsl(var(--token-success-800) / <alpha-value>)',
						900: 'hsl(var(--token-success-900) / <alpha-value>)',
						950: 'hsl(var(--token-success-950) / <alpha-value>)'
					}
				},
				warning: {
					DEFAULT: 'hsl(var(--warning-500) / <alpha-value>)',
					50: 'hsl(var(--warning-50) / <alpha-value>)',
					100: 'hsl(var(--warning-100) / <alpha-value>)',
					200: 'hsl(var(--warning-200) / <alpha-value>)',
					300: 'hsl(var(--warning-300) / <alpha-value>)',
					400: 'hsl(var(--warning-400) / <alpha-value>)',
					500: 'hsl(var(--warning-500) / <alpha-value>)',
					600: 'hsl(var(--warning-600) / <alpha-value>)',
					700: 'hsl(var(--warning-700) / <alpha-value>)',
					800: 'hsl(var(--warning-800) / <alpha-value>)',
					900: 'hsl(var(--warning-900) / <alpha-value>)',
					950: 'hsl(var(--warning-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-warning-500) / <alpha-value>)',
						50: 'hsl(var(--token-warning-50) / <alpha-value>)',
						100: 'hsl(var(--token-warning-100) / <alpha-value>)',
						200: 'hsl(var(--token-warning-200) / <alpha-value>)',
						300: 'hsl(var(--token-warning-300) / <alpha-value>)',
						400: 'hsl(var(--token-warning-400) / <alpha-value>)',
						500: 'hsl(var(--token-warning-500) / <alpha-value>)',
						600: 'hsl(var(--token-warning-600) / <alpha-value>)',
						700: 'hsl(var(--token-warning-700) / <alpha-value>)',
						800: 'hsl(var(--token-warning-800) / <alpha-value>)',
						900: 'hsl(var(--token-warning-900) / <alpha-value>)',
						950: 'hsl(var(--token-warning-950) / <alpha-value>)'
					}
				},
				error: {
					DEFAULT: 'hsl(var(--error-500) / <alpha-value>)',
					50: 'hsl(var(--error-50) / <alpha-value>)',
					100: 'hsl(var(--error-100) / <alpha-value>)',
					200: 'hsl(var(--error-200) / <alpha-value>)',
					300: 'hsl(var(--error-300) / <alpha-value>)',
					400: 'hsl(var(--error-400) / <alpha-value>)',
					500: 'hsl(var(--error-500) / <alpha-value>)',
					600: 'hsl(var(--error-600) / <alpha-value>)',
					700: 'hsl(var(--error-700) / <alpha-value>)',
					800: 'hsl(var(--error-800) / <alpha-value>)',
					900: 'hsl(var(--error-900) / <alpha-value>)',
					950: 'hsl(var(--error-950) / <alpha-value>)',
					token: {
						DEFAULT: 'hsl(var(--token-error-500) / <alpha-value>)',
						50: 'hsl(var(--token-error-50) / <alpha-value>)',
						100: 'hsl(var(--token-error-100) / <alpha-value>)',
						200: 'hsl(var(--token-error-200) / <alpha-value>)',
						300: 'hsl(var(--token-error-300) / <alpha-value>)',
						400: 'hsl(var(--token-error-400) / <alpha-value>)',
						500: 'hsl(var(--token-error-500) / <alpha-value>)',
						600: 'hsl(var(--token-error-600) / <alpha-value>)',
						700: 'hsl(var(--token-error-700) / <alpha-value>)',
						800: 'hsl(var(--token-error-800) / <alpha-value>)',
						900: 'hsl(var(--token-error-900) / <alpha-value>)',
						950: 'hsl(var(--token-error-950) / <alpha-value>)'
					}
				},
				border: 'hsl(var(--border) / <alpha-value>)'
			},
			borderRadius: {
				sm: 'calc(var(--token-radius) - 4px)',
				md: 'calc(var(--token-radius) - 2px)',
				lg: 'var(--token-radius)'
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			}
		}
	},
	plugins: [
		({ addUtilities }) => {
			addUtilities({
				'.slc-select-none': {
					'user-select': 'none', // Non-prefixed version, currently supported by Chrome and Opera
					'-webkit-touch-callout': 'none', // iOS Safari
					'-webkit-user-select': 'none', // Safari
					'-khtml-user-select': 'none', // Konqueror HTML
					'-moz-user-select': 'none', // Firefox
					'-ms-user-select': 'none' // Internet Explorer-Edge
				},
				'.slc-image-select-none': {
					'user-select': 'none', // Resmin secilemez olmasini saglar
					'-webkit-user-drag': 'none', // WebKit tabanli tarayicilarda surukleme olayini engeller
					'-webkit-touch-callout': 'none' // WebKit tabanli tarayicilarda dokunarak cagirma olayini engeller
				},
				'.slc-hide-scrollbar': {
					'-ms-overflow-style': 'none',
					'scrollbar-width': 'none'
				},
				'.slc-hide-scrollbar::-webkit-scrollbar': {
					display: 'none'
				}
			});
		}
	]
} satisfies Config;
