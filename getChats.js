function getChats() {
  return new Promise((resolve, reject) => {
    resolve(fetch('https://elegant-saucisson-63110.herokuapp.com/db')
      .catch((error) => console.warn(error))
    )
  })
}

module.exports = getChats;
