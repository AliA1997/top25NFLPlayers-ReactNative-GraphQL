//import your Player model to retrieve data from your players collection.
const Player = require('./connectors');
//Define your resolver
const resolvers = {
    Query: {
        players: () => Player.find({}, (error, players) => {
            //If there is an errror throw the error on your graphql playground.
            if(error) throw new Error(error);
            console.log('players-------', players);
            //Else return your players.
            return players;
        })
    }
}

module.exports = resolvers;