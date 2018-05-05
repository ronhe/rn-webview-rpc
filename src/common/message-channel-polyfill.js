
export class MessagePortPolyfill {
  constructor() {
    this.otherPort = null;
    this.onmessage = null;
  }

  postMessage(message) {
    if (this.otherPort && this.otherPort.onmessage) {
      this.otherPort.onmessage({ data: message });
    }
  }

  addEventListener(type, listener) {
    this.onmessage = listener;
  }

  removeEventListener() {
    this.onmessage = null;
  }

  static start() {
    // do nothing at this moment
  }
}

export class MessageChannelPolyfill {
  constructor() {
    this.port1 = new MessagePortPolyfill();
    this.port2 = new MessagePortPolyfill();
    this.port1.otherPort = this.port2;
    this.port2.otherPort = this.port1;
  }
}
