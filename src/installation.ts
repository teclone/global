export interface Callback {
  (...args: any[]): any;
  [propName: string]: any;
}

interface CallbackEntry {
  persist: boolean;
  callback: Callback;
}

export type Env = 'development' | 'prodduction';

let installCallbacks: CallbackEntry[] = [];

let uninstallCallbacks: CallbackEntry[] = [];

/**
 * indicates the installation status
 */
export let status: 'installed' | 'uninstalled' | 'none' = 'none';

/**
 * environment we are running in
 */
export let env: Env = 'development';

/**
 * host object, represents the window object
 */
export let host: Window & typeof globalThis = null;

/**
 * the root object, represents the document object
 */
export let root: Document = null;

/**
 * runs the given callback in save mode
 */
const runCallback = (callback: Callback) => {
  try {
    callback();
  } catch (ex) {
    if (env === 'development') {
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
 * @param persist - boolean indicating if the callback should be persisted
 * and ran across multiple install events, defaults to true
 */
export const onInstall = (callback: Callback, persist: boolean = true) => {
  if (installed()) {
    runCallback(callback);
  }

  if (!installed() || persist) {
    installCallbacks.push({ callback, persist });
  }
};

/**
 * registers on uninstall callback
 * @param persist - boolean indicating if the callback should be persisted
 * and ran across multiple install events, defaults to true
 */
export const onUninstall = (callback: Callback, persist: boolean = true) => {
  if (status === 'uninstalled') {
    runCallback(callback);
  }

  if (status !== 'uninstalled' || persist) {
    uninstallCallbacks.push({ callback, persist });
  }
};

/**
 * installs the globals and executes all registered onInstall callbacks
 */
export const install = (
  hostParam: Window & typeof globalThis,
  rootParam: Document
) => {
  if (hostParam !== host && rootParam !== root) {
    host = hostParam;
    root = rootParam;

    status = 'installed';
    installCallbacks.forEach((current) => runCallback(current.callback));
    installCallbacks = installCallbacks.filter((current) => !!current.persist);
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
    uninstallCallbacks.forEach((current) => runCallback(current.callback));
    uninstallCallbacks = uninstallCallbacks.filter(
      (current) => !!current.persist
    );
  }
  return true;
};

/**
 * install if window is defined
 */
if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
  install(window, window.document);
}
