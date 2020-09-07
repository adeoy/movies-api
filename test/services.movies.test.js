const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');
const { moviesMock } = require('../utils/mocks/movies');

describe('services - movies', () => {
  const MoviesServices = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  });
  const moviesService = new MoviesServices();

  describe('when getMovies method is called', async () => {
    it('should call the getcall MongoLib method', async () => {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of movies', async () => {
      const results = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepEqual(results, expected);
    });
  })

})