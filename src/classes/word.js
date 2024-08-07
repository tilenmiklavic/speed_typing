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
    this.parent_rect = this.parent.getBoundingClientRect();
    let element_rect = this.element.getBoundingClientRect();

    console.log(element_rect)

    this.position = { x: this.parent_rect.right - element_rect.width, y: this.parent_rect.y + Math.random() * this.parent_rect.height };
    console.log(this.parent_rect.y + this.parent_rect.height)
    console.log(this.position.y)

    // temp fix 
    if (this.position.y > this.parent_rect.y + this.parent_rect.height) {
      this.position.y = this.parent_rect.y + this.parent_rect.height;
    }
  }

  assignState(state) {
    this.state = state;
    this.speed = this.state.state.speed;
  }

  move(x, y) {
    this.position.x -= x;
    this.position.y += y;
    this.element.style.right = this.position.x + 'px';
    this.element.style.top = this.position.y + 'px';
  }

  kill_word(killed = true) {
    this.state.removeWord(this, killed);
    this.element.remove();
    this.stopUpdating();
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
      this.kill_word(true);
      return;
    }

    this.typed.innerHTML = this.typed_text;
    this.untyped.innerHTML = this.text.slice(text_index);

    this.move(this.speed, 0);

    if (this.position.x < this.parent_rect.x) {
      this.kill_word(false);
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