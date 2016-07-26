var doPost = require('./doPost');

function getQuote(name, message) {
  var body = JSON.stringify({name1: 'Champ', name2: name, message: message})
  return new Promise((resolve, reject) =>
    resolve(doPost('https://elegant-saucisson-63110.herokuapp.com/quote', body))
  )
}

module.exports = getQuote;
