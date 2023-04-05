const { text } = require('body-parser');
const fs = require('fs')


const scenario = fs.readFileSync('./scenario.txt', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(data);

})
const resultNames = scenario.toString();
const results1 = resultNames.match(/^[a-z]+:/gmi);

const resultText = scenario.toString();
const results2 = resultText.match(/[a-z]+.+[?,;.:!]/gmi);

const characters = [];
const charactersSpeeches = [];
results1.forEach(characterName => {
 const name = characterName.slice(0, -1);
    if (!characters.includes(name)) {
      characters.push(name);
    }
})

for(let num = 0; num < characters.length; num += 1) {
  charactersSpeeches[num] = '';
}

results2.forEach(texts => {
  let result = texts.match(/^[a-z]+:/gmi);
  let notArray = result[0]
  let resSlice = notArray.slice(0, -1);

  for(let i = 0; i < characters.length; i++) {
    if(resSlice === characters[i]) {
      const textSlice = texts.slice(characters[i].length + 2)
      charactersSpeeches[i] += textSlice;
      charactersSpeeches[i] += ' \n';
    }
  }
})

console.log(characters);

for(let num = 0; num < characters.length; num += 1) {
  fs.writeFileSync(`${characters[num]}.txt`, charactersSpeeches[num])
}