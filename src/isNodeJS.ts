/**
 * detects if we are running in a node js env
 */
export const isNodeJS = () => typeof process !== 'undefined';
