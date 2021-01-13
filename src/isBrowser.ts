import { installed } from './installation';

/**
 * detects if we are ruining in browser
 */
export const isBrowser = () => installed();
