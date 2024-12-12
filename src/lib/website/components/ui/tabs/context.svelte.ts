import { setContext, getContext } from 'svelte';
import * as tabs from '@zag-js/tabs';
import { normalizeProps, useMachine } from '@zag-js/svelte';

const GLOBAL_TABS_CTX = Symbol('GLOBAL_TABS_CTX');

export const setTabs = ({ id, value }: { id?: string; value: string }) => {
	const pid =
		typeof id === 'undefined' ? `slc-tabs-${Math.random().toString(36).substring(7)}` : id;
	const [snapshot, send] = useMachine(tabs.machine({ id: pid, value }));
	const api = $derived(tabs.connect(snapshot, send, normalizeProps));
	setContext(GLOBAL_TABS_CTX, api);
	return api;
};

const getTabs = () => {
	return getContext<ReturnType<typeof setTabs>>(GLOBAL_TABS_CTX);
};

export default getTabs;
