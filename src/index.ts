export interface Callback {
  (...args: any[]): any;
  [propName: string]: any;
}

export type Env = 'dev' | 'prod';

let installCallbacks: Callback[] = [];

let uninstallCallbacks: Callback[] = [];

/**
 * indicates the installation status
 */
export let status: 'installed' | 'uninstalled' | 'none' = 'none';

/**
 * environment we are running in
 */
export let env: Env = 'dev';

/**
 * host object, represents the window object
 */
export let host: Window & typeof globalThis = null;

/**
 * the root object, represents the document object
 */
export let root: Document = null;

/**
 * browser prefixes
 */
export const browserPrefixes = ['khtml-', 'o-', 'moz-', 'ms-', 'webkit-', ''];

/**
 * runs the given callback in save mode
 */
const runCallback = (callback: Callback) => {
  try {
    callback();
  } catch (ex) {
    if (env === 'dev') {
      console.log(ex.message);
    }
  }
};

/**
 * returns boolean indicating if library globals have been installed
 */
export const installed = (): boolean => {
  return status === 'installed';
};

/**
 * registers on install callback.
 * @param callback
 */
export const onInstall = (callback: Callback) => {
  if (installed()) {
    runCallback(callback);
  } else {
    installCallbacks.push(callback);
  }
};

/**
 * registers on uninstall callback
 */
export const onUninstall = (callback: Callback) => {
  if (status === 'uninstalled') {
    runCallback(callback);
  } else {
    uninstallCallbacks.push(callback);
  }
};

/**
 * installs the globals and executes all registered onInstall callbacks
 */
export const install = (hostParam: Window & typeof globalThis, rootParam: Document) => {
  if (hostParam !== host && rootParam !== root) {
    host = hostParam;
    root = rootParam;

    status = 'installed';
    installCallbacks.forEach(runCallback);
    installCallbacks = [];
  }
  return true;
};

/**
 * uninstalls the globals and executes all registered onUninstall callbacks
 */
export const uninstall = () => {
  if (status === 'installed') {
    host = root = null;
    status = 'uninstalled';
    uninstallCallbacks.forEach(runCallback);
    uninstallCallbacks = [];
  }
  return true;
};

/**
 * detects if we are ruining in browser
 */
export const isBrowser = () => installed();

/**
 * detects if we are running in a web service worker
 */
export const isServiceWorker = () => typeof self !== 'undefined';

/**
 * detects if we are running in a node js env
 */
export const isNode = () => typeof process !== 'undefined';

/**
 * install if window is defined
 */
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  install(window, window.document);
}
