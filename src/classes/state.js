
export default class State {
  constructor() {
    this.state = {
      speed: 3,
      words_killed: 0,
      fails: 0
    }
    
    this.words = [],
    this.sequence = [];
    this.words_bank = [];
    this.startUpdating();
    this.intervalId = null;

    this.state = new Proxy(this.state, {
      set: (target, property, value) => {
        target[property] = value;
        this.updateDOM();
        return true;
      }
    });
  }

  getState() {
    return this;
  }

  addWord(word) {
    this.words.push(word);
  }

  removeWord(word, killed = true) {
    this.words = this.words.filter(w => w !== word);
    
    if (killed) {
      this.state.words_killed++;
      this.clearSequence();
    } else {
      this.state.fails++;
    }
  }

  addToSequence(character) {
    if (/^[a-zA-Z]$/.test(character) && character.length === 1) {
      this.sequence.push(character.toLowerCase());
    }
  }

  clearSequence() {
    this.sequence = [];
  }

  update() {
    this.add_word(this.words_bank[Math.floor(Math.random() * this.words_bank.length)]);
  }

  startUpdating() {
    let interval = 1000 * this.state.speed; 
    this.intervalId = setInterval(() => this.update(), interval);
  }

  updateDOM() {
    // update words killed
    document.getElementById('words-killed').innerHTML = this.state.words_killed;

    // update fails
    document.getElementById('fails').innerHTML = this.state.fails;
  }

  demo() {
    this.state.words_killed++;
  }
}