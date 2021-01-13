/**
 * detects if we are running in a web service worker
 */
export const isServiceWorker = () => typeof self !== 'undefined';
