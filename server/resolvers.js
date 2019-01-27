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
    },
    Mutation: {
        //In a resolver field will contain obj, context, args, info
        //But in this case we will only use the args, and have the rest in a form of a private argument. 
        createPlayer: (_, args) => {
            //Assign a new instance of your Player model.
            const newlyCreatedPlayer = new Player({
                name: args.name,
                position: args.position,
                team: args.team,
                jerseyNumber: args.jerseyNumber,
                wonSuperBowl: args.wonSuperBowl
            });   
            //After assigning it, then save it to your database.
            newlyCreatedPlayer.save();
            //Now return the player your just created.
            return newlyCreatedPlayer;
        }
    }
}

module.exports = resolvers;