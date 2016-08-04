jest.unmock('../getQuote');
jest.unmock('../doPost')

describe('tests get quote', () => {
  it('fetches a quote', () => {
    const name = "Friend1"
    const message = "WHEE"
    const mockResponse = "When Chuck Norris does a pushup, he isn't lifting himself up, he's pushing the Earth down.";
    fetch = jest.fn((url, body) => new Promise((resolve, reject) => {
      resolve( { text: () => (mockResponse) } )
    }));
    var getQuote = require('../getQuote');
    return getQuote(name, message)
      .then((response) => expect(response.text()).toBe(mockResponse));
  });
});
