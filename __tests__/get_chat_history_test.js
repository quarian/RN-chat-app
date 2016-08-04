jest.unmock('../getChatHistory');
jest.unmock('../doPost')

describe('tests get quote', () => {
  it('fetches a quote', () => {
    const name = "Friend1"
    const mockResponse = '[["Champ","kjhhh","2016-08-04 06:07:34.652756 +0000 +0000"],["Friend3","I see, you wrote: kjhhh","2016-08-04 06:07:34.655188 +0000 +0000"],["Friend3","Remninds me of a joke - ","2016-08-04 06:07:34.657116 +0000 +0000"],["Friend3","In the first Jurassic Park movie, the Tyrannosaurus Rex wasn\'t chasing the jeep. Chuck Norris was chasing the Tyrannosaurus AND the jeep.","2016-08-04 06:07:34.937885 +0000 +0000"],["Champ","vrt","2016-08-04 06:07:39.215687 +0000 +0000"],["Friend3","I see, you wrote: vrt","2016-08-04 06:07:39.218084 +0000 +0000"],["Friend3","Remninds me of a joke - ","2016-08-04 06:07:39.219961 +0000 +0000"],["Friend3","The quickest way to a man\'s heart is with Chuck Norris\' fist.","2016-08-04 06:07:39.321507 +0000 +0000"]]';
    fetch = jest.fn((url, body) => new Promise((resolve, reject) => {
      resolve( { json: () => (JSON.parse(mockResponse)) } )
    }));
    var getChatHistory = require('../getChatHistory');
    return getChatHistory(name)
      .then((response) =>
        { expect(response.json()).toEqual(JSON.parse(mockResponse)) })
  });
});
