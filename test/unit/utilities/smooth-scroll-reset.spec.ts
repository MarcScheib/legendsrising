import { smoothScrollReset } from 'utilities/smooth-scroll-reset';

/* tslint:disable */
function createMockDomElement(options): Element {
  options.attributes = options.attributes || {};

  return {
    listeners: {},

    getAttribute: function (name: string) {
      return options.attributes[name];
    },
    scrollTop: options.scrollTop || 0,
    addEventListener: function (event, cb) {
      this._listeners[event] = cb;
    },
    removeEventListener: function (event, cb) {
      delete this._listeners[event];
    }
  };
}

window.requestAnimationFrame = (function () {
  return function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
})();

describe('the Smooth Scroll Reset utility', () => {
  it('should return silently with no input', () => {
    const elem = createMockDomElement({scrollTop: 1500});
    smoothScrollReset(undefined);
    expect(elem.scrollTop).toBe(1500);
  });

  it('should reset elements scroll top position', (done: jest.DoneCallback) => {
    const elem = createMockDomElement({scrollTop: 1500});
    smoothScrollReset(elem);

    setTimeout(() => {
      expect(elem.scrollTop).toBe(0);
      done();
    }, 1000);
  });
});
