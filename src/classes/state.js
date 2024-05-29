export default class State {
  constructor() {
    this.state = {
      words: [],
    };
    this.sequence = [];
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
}