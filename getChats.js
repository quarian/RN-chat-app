function getChats(callback, context) {
  fetch('https://elegant-saucisson-63110.herokuapp.com/db')
    .then((response) => response.text())
    .then((responseText) => callback(context, JSON.parse(responseText)))
    .catch((error) => console.warn(error))
}

module.exports = getChats;
