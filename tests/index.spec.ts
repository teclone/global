import * as Globals from '../src/index';

describe('Globals', function() {
  describe('installed()', function() {
    it(`should return true if globals has been installed`, function() {
      expect(Globals.installed()).toBe(true);
    });
  });
});
