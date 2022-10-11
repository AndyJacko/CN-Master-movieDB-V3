# Test Data

# Add Movie

node src/app --action create --movie // Gives Error: Movie Already In DB // Gives Error: "No Movie To Add"

node src/app --action create --movie "A New Hope, Mark Hammil, George Lucas, 1977" // Gives Error: "Movie Already In DB"

node src/app --action create --movie "Watership Down, , , 1978" // Returns "Movie Added"

# View Movie By ID

node src/app --action readOne --id 1 // Gives Error: "Unknown ID Format"

node src/app --action readOne --id 63454bc95a1554790bd1cfb3 // Gives Error: "No Movie Found With ID: 63454bc95a1554790bd1cfb3"

node src/app --action readOne --id 63454bc1b5edbacb9ebebaec // Returns 3:33 Movie Details

node src/app --action readOne --id 63454bc95a1554790bd1cfb6 // Returns The Omen Movie Details

node src/app --action readOne --id 63454bd0cb0d9f2b665198c6 // Returns Triple 9 Movie Details

# View All Movies

node src/app --action readAll // Returns List Of All Movies

# Update Movie By ID

node src/app --action update --id 1 --movie "The Omen 2, William Holden, Don Taylor, 1978" // Gives Error: "Unknown ID Format"

node src/app --action update --id 63454bc95a1554790bd1cfb5 --movie "The Omen 2, William Holden, Don Taylor, 1978" // Gives Error: "No Movie Found With ID: 63454bc95a1554790bd1cfb5"

node src/app --action update --id 63454bc95a1554790bd1cfb6 --movie // Gives Error: "No Movie Details To Update"

node src/app --action update --id 63454bc95a1554790bd1cfb6 --movie "The Omen 2, William Holden, Don Taylor, 1978" // Returns "Updated Movie With ID: 63454bc95a1554790bd1cfb6"

node src/app --action update --id 63454bc95a1554790bd1cfb6 --movie "The Omen, Gregory Peck, Richard Donner, 1976" // Returns "Movie With ID: 63454bc95a1554790bd1cfb6 Already Up To Date"

# Delete Movie By ID

node src/app --action delete --id 1 // Gives Error: "Unknown ID Format"

node src/app --action delete --id 6345713b1db40ce29dfa0412 // Gives Error: "No Movie Found With ID: 6345713b1db40ce29dfa0412"

node src/app --action delete --id **VALID ID** // Returns "Movie Deleted"
