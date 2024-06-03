import Word from './classes/word.js';
import State from './classes/state.js';

// create a new object state
let state = new State();

function new_word(text) {
  // create new object word 
  // place it inside the #main div
  let new_word = new Word(text.toLowerCase());
  let word_container = document.createElement('div');
  let typed_container = document.createElement('span');
  let untyped_container = document.createElement('span');
  let main_container = document.getElementById('main');

  new_word.assignElement(word_container);
  new_word.assignState(state);

  word_container.classList.add('word-container');
  typed_container.classList.add('typed');
  untyped_container.classList.add('untyped');
  untyped_container.innerHTML = new_word.text;
  word_container.appendChild(typed_container);
  word_container.appendChild(untyped_container);
  new_word.untyped = untyped_container;
  new_word.typed = typed_container;

  main.appendChild(word_container);

  state.addWord(new_word);
  new_word.startUpdating();
  new_word.assignParent(main_container);

}

async function readWordsFile() {
  try {
    const response = await fetch('../lib/words.txt');
    const data = await response.text();
    const wordsArray = data.split('\n').map(word => word.trim()).filter(word => word.length > 0);
    return wordsArray;
  }
  catch (error) {
    console.error('Error reading the file:', error);
  };
}

// LISTENERS 
document.addEventListener('keydown', function (event) {
  state.addToSequence(event.key);
});

document.getElementById('increase-speed').addEventListener('click', function (event) {
  state.updateSpeed(1);
});

document.getElementById('decrease-speed').addEventListener('click', function (event) {
  state.updateSpeed(-1);
});


window.addEventListener('load', async function () {
  try {
    const words = await readWordsFile();
    state.words_bank = words;
    state.add_word = new_word;
  } catch (error) {
    console.error('Error:', error);
  }
})