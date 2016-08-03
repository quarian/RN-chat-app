jest.unmock('../getChats');

describe('getChats', () => {
  it('fetches the list of chat friends', () => {
    const mockResponse =
      '["Champ","Friend1","Friend2","Friend3","Friend4","Friend5"]';
    fetch = jest.fn((url, options) => new Promise((resolve, reject) => {
      resolve( { text: () => (mockResponse) })
    }));
    var getChats = require('../getChats');
    callback = (json, context) => {expect(json).toBe(JSON.parse(mockResponse))};
    getChats(callback, null);
  });
});
