const { gql } = require('apollo-server');

// Define your type definitions which be Query, and Player object types
const typeDefs = gql`
    # Define your Query object type which have a players field 
    # that will return an array of Player object types.
    type Query {
        # Specify your are returning the Player object type.
        players: [Player]
        # Specify a query that get's just one player based on thier id.
        getPlayer(id: String): Player
    }
    # Define your Mutation object which will be responsible for creating, updating, and deleting data.
    # Will return the player created, updated, or delete.
    type Mutation {
        # Return Player object when it's created.
        createPlayer(position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        # Use a id with your new position, name, team, jerseyNumber and wonSuperBowl. 
        # Also have all the arguments nullable.
        updatePlayer(id: String, position: String, name: String, team: String, jerseyNumber: Int, wonSuperBowl: Boolean): Player
        # Also have a delete Player which would delete a player, in this we would do  return all the players after deleting one player.
        deletePlayer(id: String): Player
    }
    # Define your Player object type.
    # Alter your Player object type and add a id with type String.
    type Player {
        id: String
        position: String
        name: String
        team: String
        jerseyNumber: Int
        wonSuperBowl: Boolean
    }
    # Set your query keyword to your Query object type.
    schema {
        query: Query
        mutation: Mutation
    }
`;

//Export your type definitions as a default export 
module.exports = typeDefs;