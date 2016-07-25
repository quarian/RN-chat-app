function getChatHistory(name, callback, context) {
  fetch('https://elegant-saucisson-63110.herokuapp.com/chat', {
    method: 'POST',
    headers: {},
    body: JSON.stringify({
            name1: 'Champ',
            name2: name
      })
    })
    .then((response) => response.text())
    .then((responseText) => callback(JSON.parse(responseText), context))
    .catch((error) => console.warn(error))
}

module.exports = getChatHistory;
