import { setContext, getContext } from 'svelte';

type GlobalContextType = {
	windowWidth?: number;
	appName?: string;
	currentScreen?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	screens?: {
		sm?: number;
		md?: number;
		lg?: number;
		xl?: number;
	};
};

class GlobalContext {
	data: GlobalContextType = $state({
		appName: 'SLC Svelte Virtual Data Table',
		windowWidth: 1000,
		currentScreen: 'lg',
		screens: {
			sm: 640, // tablet
			md: 768, // tablet landscape
			lg: 1024, // laptop
			xl: 1280 // desktop
		}
	});
}

const GLOBAL_CTX = Symbol('WEBSITE_GLOBAL_CTX');

export const setGlobalContext = () => {
	const globalContext = new GlobalContext();
	setContext(GLOBAL_CTX, globalContext);
	return globalContext;
};

export const getGlobalContext = () => {
	return getContext<ReturnType<typeof setGlobalContext>>(GLOBAL_CTX);
};
