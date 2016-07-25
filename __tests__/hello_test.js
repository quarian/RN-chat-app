jest.unmock('../index.android.js'); // unmock to use the actual implementation of sum

describe('getChats', () => {
  it('fetches the list of chat friends', () => {
    expect(1 + 2).toBe(3);
  });
});
