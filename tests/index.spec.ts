import * as Globals from '../src/index';

describe('Globals', function() {
  describe('installed()', function() {
    it(`should return true if globals has been installed`, function() {
      expect(Globals.installed()).toBe(true);
    });
  });

  describe('isBrowser()', function() {
    it(`should return true if we are running in a browser`, function() {
      expect(Globals.isBrowser()).toBe(true);
    });
  });

  describe('isServiceWorker()', function() {
    it(`should return true if we are running in a web worker`, function() {
      expect(Globals.isServiceWorker()).toBe(true);
    });
  });
});
