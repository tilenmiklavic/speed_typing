
export default class State {
  constructor() {
    this.state = {
      words: [],
    };
    this.sequence = [];
    this.words_bank = [];
    this.speed = 3;
    this.words_killed = 0;
    this.startUpdating();
    this.intervalId = null;
  }

  getState() {
    return this.state;
  }

  addWord(word) {
    this.state.words.push(word);
  }

  removeWord(word) {
    this.state.words = this.state.words.filter(w => w !== word);
  }

  addToSequence(character) {
    if (/^[a-zA-Z]$/.test(character) && character.length === 1) {
      this.sequence.push(character.toLowerCase());
    }
  }

  clearSequence() {
    this.sequence = [];
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
  }

  update() {
    this.add_word(this.words_bank[Math.floor(Math.random() * this.words_bank.length)]);
  }

  startUpdating() {
    let interval = 1000 * this.speed; 
    console.log(interval)
    this.intervalId = setInterval(() => this.update(), interval);
  }
}