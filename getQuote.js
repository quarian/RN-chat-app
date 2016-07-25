function getQuote(name, message, callback, parent) {
  fetch('https://elegant-saucisson-63110.herokuapp.com/quote', {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
            name1: 'Champ',
            name2: name,
            message: message
      })
    })
    .then((response) => response.text())
    .then((responseText) => callback(responseText, parent))
    .catch((error) => console.warn(error))
}

module.exports = getQuote;
