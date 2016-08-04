function doPost(url, body) {
  return new Promise((resolve, reject) => {
    resolve(
      fetch(url,
                  {
                    method: 'POST',
                    headers: {},
                    body: body
                  })
      .catch((error) => console.warn(error))
    )
  })
}

module.exports = doPost;
