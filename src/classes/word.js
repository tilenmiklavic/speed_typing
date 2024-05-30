export default class Word {
  constructor(text) {
    this.text = text.toLowerCase();
    this.typed_text = '';
    this.speed = 1;
    this.intervalId = null;
    this.state = null;
  }

  assignElement(element) {
    this.element = element;
  }

  assignParent(parent) {
    this.parent = parent;
    let rect = this.parent.getBoundingClientRect();
    this.position = { x: rect.x, y: rect.y + Math.random() * rect.height };
  }

  assignState(state) {
    this.state = state;
  }

  move(x, y) {
    this.position.x += x;
    this.position.y += y;
    this.element.style.left = this.position.x + 'px';
    this.element.style.top = this.position.y + 'px';
  }

  kill_word() {
    this.state.removeWord(this);
    this.element.remove();
    this.stopUpdating();
    this.state.clearSequence();
  }

  update() {
    this.typed_text = '';
    let text_index = 0;
    for (let i = 0; i < this.state.sequence.length; i++) {
      if (this.state.sequence[i] === this.text[text_index]) {
        this.typed_text += this.text[text_index];
        text_index++;
      } 
    }

    if (this.typed_text === this.text) {
      this.kill_word();
      return;
    }

    this.typed.innerHTML = this.typed_text;
    this.untyped.innerHTML = this.text.slice(text_index);

    this.move(this.speed, 0);

    if (this.position.x > this.parent.getBoundingClientRect().right) {
      this.state.removeWord(this);
      this.element.remove();
      this.stopUpdating();
    }
  }

  startUpdating(interval = 10) {
    if (this.intervalId === null) {
      this.intervalId = setInterval(() => this.update(), interval);
    }
  }

  stopUpdating() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}