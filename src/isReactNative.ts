/**
 * detects if we are running in react native env
 */
export const isReactNative = () =>
  typeof process == 'undefined' && typeof global !== 'undefined';
