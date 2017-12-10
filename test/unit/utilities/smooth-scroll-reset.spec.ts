import {smoothScrollReset} from 'utilities/smooth-scroll-reset';

function createMockDomElement(options: { attributes, scrollTop }): Element {
  options.attributes = options.attributes || {};

  return Object.assign({}, Object.create(Element), {
    listeners: {},

    getAttribute: (name: string) => {
      return options.attributes[name];
    },
    scrollTop: options.scrollTop || 0,
    addEventListener: (event: any, cb: any) => {
      this._listeners[event] = cb;
    },
    removeEventListener: (event: any, cb: any) => {
      delete this._listeners[event];
    }
  });
}

window.requestAnimationFrame = (() => {
  return function (callback: FrameRequestCallback): number {
    return window.setTimeout(callback, 1000 / 60);
  };
})();

describe('the Smooth Scroll Reset utility', () => {
  it('should return silently with no input', () => {
    const elem = createMockDomElement({attributes: undefined, scrollTop: 1500});
    smoothScrollReset(undefined);
    expect(elem.scrollTop).toBe(1500);
  });

  it('should reset elements scroll top position', (done: jest.DoneCallback) => {
    const elem = createMockDomElement({attributes: undefined, scrollTop: 1500});
    smoothScrollReset(elem);

    setTimeout(() => {
      expect(elem.scrollTop).toBe(0);
      done();
    }, 1000);
  });
});
