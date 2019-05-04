//import react since your  importing your components
import React from 'react';
//Import drawer navigator which will create your Screens
//IMport your stack navigator for nested  routes to get a individual player.
import { createDrawerNavigator, createStackNavigator } from 'react-navigation';
//import your components for your navigator
import Home from './Home';
import PlayersList from './PlayersList';
import CreatePlayer from './CreatePlayer';
import Player from './Player';


//Use the createStackNavigator to enable nested routes. 
const PlayerListNavigator = createStackNavigator(

    {
        PlayersList: PlayersList,
        Player: Player
    },
    //You initial route would be the player's list.
    {
        initialRouteName: 'PlayersList',
        //We will have a back button visible for a better user experience.
        headerBackTitleVisible: true
    }
);

//Assign your navigator to variable call Navigator
const Navigator = createDrawerNavigator(
    //The first argument will have the screen name as the key and component set that that screen as the value.
    {
        Home: Home,
        //Replace your Player's List component with your PlayerListNavigator.
        PlayersList: PlayerListNavigator,
        CreatePlayer: CreatePlayer,
    },
    //Your second object will have options set towards the navigator, such as initialRouteName
    {
        initialRouteName: 'Home'
    }
)


//Export the Navigator as a default export 
export default Navigator;