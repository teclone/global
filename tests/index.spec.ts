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

  describe('onInstall()', function() {
    it(`should register the callback and persist it if persist is set to true or not set at all`, function() {
      const callback = jest.fn();
      Globals.onInstall(callback, true);

      Globals.install({} as any, {} as any);
      Globals.install(window, window.document);

      expect(callback.mock.calls.length).toEqual(3);
    });
  });

  describe('onUninstall()', function() {
    it(`should register the callback and persist it if persist is set to true or not set at all`, function() {
      const callback = jest.fn();
      Globals.onUninstall(callback, true);

      Globals.uninstall();
      Globals.install({} as any, {} as any);

      Globals.uninstall();
      Globals.install(window, window.document);

      expect(callback.mock.calls.length).toEqual(2);
    });
  });
});
