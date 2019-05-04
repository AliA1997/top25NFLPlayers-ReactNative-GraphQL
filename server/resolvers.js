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
        }),
        //You can also use args on getting individual players. 
        //Have the callback asynchronous to return the player when it contains data.
        getPlayer: (_, args) => Player.findById({_id: args.id}, async (error, playerToReturn) => {
            //If there is an error throw an error on your graphql playground.
            if(error) throw new Error(error);
            //Else return the player based on it's id.
            return await playerToReturn;
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
        },
        updatePlayer: (_, args) => {
            //Pass the arguments of the mutation to the findByIdAndUpdate method on your model
            //Then use the $set to set the specific fields based on the arguments of the mutation
            //Update the player based on it's id.
            //Make the callback asynchronous so you can return playerUpdated before return out of the function.
            return Player.findByIdAndUpdate({_id: args.id}, {$set: args}, async (error, playerUpdated) => {
                if (error) {
                    throw new Error(error);
                }
                //Return the updated player.
                return await playerUpdated;
            });
        },
        deletePlayer: (_, args) => {
            //Pass the args id to the findByIdANdDelete method then you 
            //and perform an empty return since we will navigate to the player's list on the front end..
            return Player.findByIdAndDelete({_id: args.id}, (error, playerDeleted) => {
                if(error) {
                    throw new Error(error);
                    
                }
                //Return out the function.
                return;
            });

        }
    }
}

module.exports = resolvers;