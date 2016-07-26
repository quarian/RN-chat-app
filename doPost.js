function doPost(url, body, callback, context) {
  fetch(url,
    {
      method: 'POST',
      headers: {},
      body: body
    })
    .then((response) => response.text())
    .then((responseText) => callback(responseText, context))
    .catch((error) => console.warn(error))
}

module.exports = doPost;