const yargs = require("yargs/yargs")(process.argv.slice(2)).argv;
const { client, connection } = require("./db/connection");

const MovieDB = require("./utils/movieDB");

const app = async (yargs) => {
  const collection = await connection();
  const newMovieDB = new MovieDB();

  try {
    if (yargs.action && yargs.action.length > 0) {
      switch (yargs.action) {
        case "create":
          console.log(
            `\n\n${await newMovieDB.create(collection, yargs.movie)}`
          );
          break;

        case "readOne":
          const oneMovie = await newMovieDB.readOne(collection, yargs.id);

          if (oneMovie._id) {
            console.log(`\n\nMOVIE DETAILS\n-------------\n`);
            console.log(
              `ID: ${
                oneMovie._id
              }\nTitle: ${oneMovie.title.toUpperCase()}\nActor: ${
                oneMovie.actor
              }\nDirector: ${oneMovie.director}\nReleased: ${
                oneMovie.released
              }\n`
            );
          } else {
            console.log(`\n\n${oneMovie}`);
          }
          break;

        case "readAll":
          const allMovies = await newMovieDB.readAll(collection);

          if (allMovies.length > 0) {
            console.log(`\n\nANDY'S MOVIE DATABASE\n---------------------\n`);

            allMovies.forEach((movie) => {
              console.log(
                `ID: ${
                  movie._id
                }\nTitle: ${movie.title.toUpperCase()}\nActor: ${
                  movie.actor
                }\nDirector: ${movie.director}\nReleased: ${movie.released}\n`
              );
            });
          } else {
            console.log(`\n\nANDY'S MOVIE DATABASE\n---------------------\n`);
            console.log(`No Movies In Database`);
          }
          break;

        case "update":
          const updatedMovie = await newMovieDB.update(
            collection,
            yargs.id,
            yargs.movie
          );
          console.log(`\n\n${updatedMovie}`);
          break;

        case "delete":
          const deletedMovie = await newMovieDB.delete(collection, yargs.id);
          console.log(`\n\n${deletedMovie}`);
          break;

        default:
          console.log(`\n\nUnknown Action`);
          break;
      }
    } else {
      console.log(`\n\nNo Action Supplied`);
    }

    await client.close();
  } catch (err) {
    console.log(err);
    await client.close();
  }
};

app(yargs);
