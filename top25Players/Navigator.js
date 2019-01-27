//import react since your  importing your components
import React from 'react';
//Import drawer navigator which will create your Screens
import { createDrawerNavigator } from 'react-navigation';
//import your components for your navigator
import Home from './Home';
import PlayersList from './PlayersList';
import CreatePlayer from './CreatePlayer';

//Assign your navigator to variable call Navigator
const Navigator = createDrawerNavigator(
    //The first argument will have the screen name as the key and component set that that screen as the value.
    {
        Home: Home,
        PlayersList: PlayersList,
        CreatePlayer: CreatePlayer
    },
    //Your second object will have options set towards the navigator, such as initialRouteName
    {
        initialRouteName: 'Home'
    }
)


//Export the Navigator as a default export 
export default Navigator;