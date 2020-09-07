const MongoLib = require('../lib/mongo');

class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDb = new MongoLib();
  }
  async getMovies({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const movies = await this.mongoDb.getAll(this.collection, query);
    return movies || [];
  }

  async getMovie({ movieId }) {
    const movie = await this.mongoDb.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie({ movie }) {
    const createdId = await this.mongoDb.create(this.collection, movie);
    return createdId || {};
  }

  async updateMovie({ movieId, movie } = {}) {
    const updateId = await this.mongoDb.update(this.collection, movieId, movie);
    return updateId || {};
  }

  async deleteMovie({ movieId }) {
    const deletedId = await this.mongoDb.delete(this.collection, movieId);
    return deletedId || {};
  }
}

module.exports = MoviesService;
