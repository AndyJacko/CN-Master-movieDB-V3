const ObjectId = require("mongodb").ObjectId;

class MovieDB {
  async create(connection, movie) {
    if (movie.length > 0) {
      const mov = movie.split(",");

      const newMovie = {
        title: mov[0].trim() || "Not Specified",
        actor: mov[1].trim() || "Not Specified",
        director: mov[2].trim() || "Not Specified",
        released: mov[3].trim() || "Not Specified",
      };

      const selectedMovie = await connection
        .find({ title: mov[0].trim() })
        .toArray();

      if (selectedMovie[0]) {
        return "Movie Already In DB";
      } else {
        await connection.insertOne(newMovie);
        return "Movie Added";
      }
    } else {
      return "No Movie To Add";
    }
  }

  async readOne(connection, id) {
    if (id.length === 24) {
      const selectedMovie = await connection
        .find({ _id: ObjectId(id) })
        .toArray();

      if (selectedMovie[0]) {
        return selectedMovie[0];
      } else {
        return `No Movie Found With ID: ${id}`;
      }
    } else {
      return "Unknown ID Format";
    }
  }

  async readAll(connection) {
    return await connection.find({}).toArray();
  }

  async update(connection, id, movie) {
    if (id.length === 24) {
      if (movie.length > 0) {
        const mov = movie.split(",");

        const newMovie = {
          title: mov[0].trim() || "Not Specified",
          actor: mov[1].trim() || "Not Specified",
          director: mov[2].trim() || "Not Specified",
          released: mov[3].trim() || "Not Specified",
        };
        const updatedMovie = await connection.updateOne(
          { _id: ObjectId(id) },
          { $set: newMovie }
        );

        if (updatedMovie.matchedCount === 1) {
          if (updatedMovie.modifiedCount === 1) {
            return `Updated Movie With ID: ${id}`;
          } else {
            return `Movie With ID: ${id} Already Up To Date`;
          }
        } else {
          return `No Movie Found With ID: ${id}`;
        }
      } else {
        return "No Movie Details To Update";
      }
    } else {
      return "Unknown ID Format";
    }
  }

  async delete(connection, id) {
    if (id.length === 24) {
      const selectedMovie = await connection
        .find({ _id: ObjectId(id) })
        .toArray();

      if (selectedMovie[0]) {
        const deletedMovie = await connection.deleteOne({ _id: ObjectId(id) });

        if (deletedMovie.deletedCount === 1) {
          return `Movie Deleted`;
        } else {
          return `Movie NOT Deleted`;
        }
      } else {
        return `No Movie Found With ID: ${id}`;
      }
    } else {
      return "Unknown ID Format";
    }
  }
}

module.exports = MovieDB;
