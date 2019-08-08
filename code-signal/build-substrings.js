class Trie {
  constructor(val, isWord) {
    this.val = val;
    this.isWord = isWord;
    this.letters = {};
  }
}

function findSubstrings(words, parts) {
  const trie = buildTrie(parts);
  return words.map( w => wrapWithBracket(w, trie))
}

function wrapWithBracket(word, trie) {
  const si = 0;
  const ei = 0;
  const current = trie;
  for(let i = 0; i < word.length; i++) {
    
  }
}

function buildTrie(arr) {
  const trie = new Trie(null, false);
  arr.forEach( w => addWordToTrie(trie, w) )

  return trie;
}

function addWordToTrie(trie, word) {
  for (let i = 0; i < word.length; i++) {
    const l = word[i]
    if(!trie.letters[l]) {
      trie.letters[l] = new Trie(l, i === word.length-1)
    }

    trie = trie.letters[l]
  }
}

const words = [
  "Apple",
  "Melon",
  "Orange",
  "Watermelon"
]
const parts = [
  "a",
  "mel",
  "lon",
  "el",
  "An"
]
// const sub = findSubstrings(words, parts)
const trie = buildTrie(parts)
debugger
console.log(trie)