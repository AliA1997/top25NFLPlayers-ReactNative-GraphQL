import React, { PureComponent } from 'react';
//import your Ui needed for your player screen.
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Platform, TextInput } from 'react-native';
//Import your Mutation component from react apollo that will be responsible for delete data from your graphql server.
import { Query, Mutation } from 'react-apollo';
//import your gql from graphql-tag to define schema for your graphql queries and mutations.
import gql from 'graphql-tag';

//Define a query to get that specific player information.
//Alias your query to make it more developer friendly.
//Define a variable for retrieving Player based on id.
const getPlayerQuery = gql`
    query GetPlayer($id: String) {
        player: getPlayer(id: $id) {
            name
            position
            team
            jerseyNumber
            wonSuperBowl
        }
    }
`;
//Define your updateMutation which will be responsible for updating data.
//It will update a player based on the info provided.
const updateMutation = gql`
    mutation UpdatePlayer($id: String, $name: String, $position: String, $team: String, $jerseyNumber: Int, $wonSuperBowl: Boolean) {
        updatePlayer(id: $id, name: $name, position: $position, team: $team, jerseyNumber: $jerseyNumber, wonSuperBowl: $wonSuperBowl) {
            name
            position
            team
            jerseyNumber
            wonSuperBowl
        }
    }
`;


//Define your deleteMutation which will be responsible for deleting data.
//It will delete a player based on it's id.
const deleteMutation = gql`
        mutation DeletePlayer($id: String!) {
            deletePlayer(id: $id) {
                name
                position
                team
                jerseyNumber
                wonSuperBowl
            }
        }
`;


//
export default class Player extends PureComponent {
    //Define your state for field for updating a player, and for displaying the edit form.
    //Then have a state for containing the result of a optimisticResponse.
    constructor() {
        super();
        this.state = {
            //Define a state for holding your currentPlayer
            currentPlayer: {},
            returnedPlayer: {},
            updatedName: '',
            updatedPosition: '',
            updatedTeam: '',
            updatedJerseyNumber: null,
            updatedWonSuperBowl: false,
        }
        //make sure to bind your functions in your constructor to update the ui.
        this.updatePlayerFunc = this.updatePlayerFunc.bind(this);
        this.deletePlayerFunc = this.deletePlayerFunc.bind(this);
        
    }

    static navigationOptions = {
        headerLabel: 'Player'
    }


    //Define your updatePlayerFunc method that will take our mutate updatePlayer method as an argument.
    //Will have the function asynchronous so we will update the player before redirecting to the player's list.
    async updatePlayerFunc(func) {
        //Assign a variable called id from your id in your params.
        const id = this.props.navigation.getParam("id");
        //Pass all your fields from your state to a updatePlayer object.
        const updatedPlayer = {
            id,
            name: this.state.updatedName,
            position: this.state.updatedPosition,
            team: this.state.updatedTeam,
            jerseyNumber: parseInt(this.state.updatedJerseyNumber),
            wonSuperBowl: this.state.updatedWonSuperBowl
        };

        for(var key in updatedPlayer) {
            if(!updatedPlayer[key] && typeof updatedPlayer[key] != 'boolean') 
                updatedPlayer[key] = this.state.returnedPlayer[key];

        }

        console.log('updatedPlayer---------', updatedPlayer);
        //After deleting invalid fields from your updatedPlayer object
        //pass your updatedPlayer to your variables object in your mutate function.
        //Then we will set our optimisticResponse which will update the component with our updatedResult.
        const { data } = await func({
                            variables: updatedPlayer,
                        });

        this.setState({
            updatedName: '',
            updatedPosition: '',
            updatedTeam: '',
            updatedJerseyNumber: null,
            updatedWonSuperBowl: false,
        });

        //After updating the player navigate to the home screen.
        this.props.navigation.navigate('Home');
        
    }

    //Define your delete player function that will take your deletePlayer mutate a function as an argument.
    //Will make function asynchronous so it will first deletePlayer completely then redirect the user.
    async deletePlayerFunc(func) {
        //Then assign a variable called id from your params.
        const id = this.props.navigation.getParam('id');
        
        //Pass id as variable to the deletePlayer mutate function.
        await func({
            variables: { id }
        });


        //then redirect to the player's list.
        this.props.navigation.navigate('Home', {id: id});
    }

    render() {
        //Define a playerId variable which would get the id param from the navigation.
        const playerId = this.props.navigation.getParam("id");

        return (
            <ScrollView>
                {/* Use the getPlayerQuery for your Query component*/}
                {/*Define your fetchPOlicy which will perform an api call and will update cache */}
                <Query query={getPlayerQuery}
                    variables={{id: playerId}}
                    fetchPolicy="cache-and-network"
                >
                    {(response, error) => {
                        //If there is an error log the error to the console.
                        if(error) {
                            console.log("Get Player Error------", error);
                        }
                        //If the response has data.
                        if(response.data && response.data.player) {
                            //SEt the state of the returnedPlayer to the response's player returned.
                            this.setState({returnedPlayer: response.data.player});
                            //Set the state of the updatedWonSuperBowl 
                            return (
                                <View>
                                    <Text style={styles.playerText}>
                                        {/*Render the name of the player if the updated player value is null*/}
                                        {this.state.returnedPlayer && this.state.returnedPlayer.name ? this.state.returnedPlayer.name : response.data.player.name}
                                    </Text>
                                    <Text style={styles.playerText}>
                                        {/*Render the position of the player if the updated player value is null*/}
                                        {this.state.returnedPlayer && this.state.returnedPlayer.position ? this.state.returnedPlayer.position : response.data.player.position}
                                    </Text>
                                    <Text style={styles.playerText}>
                                        {/*Render the team of the player if the updated player value is null*/}
                                        {this.state.returnedPlayer && this.state.returnedPlayer.team ? this.state.returnedPlayer.team : response.data.player.team}
                                    </Text>
                                    <Text style={styles.playerText}>
                                        {/*Render the jerseyNumber of the player if the updated player value is null*/}
                                        Jersey #{this.state.returnedPlayer && this.state.returnedPlayer.jerseyNumber ? this.state.returnedPlayer.jerseyNumber : response.data.player.jerseyNumber}
                                    </Text>
                                    <Text style={styles.playerText}>
                                        {/*Render yes or no based on the wonSuperBowl boolean of the player if the updated player value is null*/}
                                        Superbowl Champion? {this.state.returnedPlayer && this.state.returnedPlayer.wonSuperBowl || response.data.player.wonSuperBowl ? 'Yes' : 'No'}
                                    </Text>
                                </View>
                            );
                        }
                        //Return the loading text if there is no data.
                        return <Text>Loading....</Text>
                    }}
                </Query>
                <View>
                    <Text style={styles.label}>
                        Name:
                    </Text>
                    <TextInput
                        style={styles.input} 
                        value={this.state.updatedName} 
                        onChangeText={text => this.setState({updatedName: text})}
                    />
                    <Text style={styles.label}>
                        Position:
                    </Text>
                    <TextInput
                        style={styles.input} 
                        value={this.state.updatedPosition} 
                        onChangeText={text => this.setState({updatedPosition: text})}
                    />
                    <Text style={styles.label}>
                        Team:
                    </Text>
                    <TextInput
                        style={styles.input} 
                        value={this.state.updatedTeam} 
                        onChangeText={text => this.setState({updatedTeam: text})}
                    />                                        
                    <Text style={styles.label}>
                        Jersey Number:
                    </Text>
                    <TextInput
                        style={styles.input} 
                        value={this.state.updatedJerseyNumber}
                        onChangeText={text => this.setState({updatedJerseyNumber: text})}
                    />
                    <View style={styles.buttonView}>
                        {/*Have two buttons indicating if they won a super bowl or not. */}
                        <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={(e) => this.setState({updatedWonSuperBowl: true})}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity title="No"  style={[styles.button, styles.noButton]} onPress={(e) => this.setState({updatedWonSuperBowl: false})}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                    </View>
 
                </View>
                <Mutation
                    mutation={updateMutation}
                >
                    {(updatePlayer) => {

                        if(updatePlayer) {
                            return (
                                <TouchableOpacity style={styles.updateButton}
                                    onPress={async () => await this.updatePlayerFunc(updatePlayer)}>
                                    <Text>
                                        Update
                                    </Text>    
                                </TouchableOpacity> 
                            );
                        }
                        return <Text/>
                    }}
                </Mutation>
                <Mutation
                    mutation={deleteMutation}>
                    {(deletePlayer) => {

                        if(deletePlayer) {
                            return (
                                <TouchableOpacity onPress={async () => await this.deletePlayerFunc(deletePlayer)} style={styles.deleteButton}>
                                    <Text>
                                        Delete    
                                    </Text>    
                                </TouchableOpacity>  
                            );             
                        }

                        return <Text/>
                    }}
                </Mutation>
            </ScrollView>
        );
    }
}


//Define the styles for your PLayerScreen.
const styles = StyleSheet.create({
    updateButton: {
        backgroundColor: 'blue',
        height: 30,
        width: 200,
    },
    deleteButton: {
        backgroundColor: 'yellow',
        height: 30,
        width: 200
    },
     //Styles for your button
     buttonView: {
        width: 350,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        width: 100,
        height: 35,
        borderRadius: 15,
    },
    yesButton: {
        backgroundColor: 'green'
    },
    noButton: {
        backgroundColor: 'red'
    },
    buttonText: {
        fontSize: 15,
        color: 'white',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        //Make the font family Platform specific.
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        })
    },
    playerText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        })
    },
    label: {
        fontSize: 17,
        fontWeight: '400',
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        })
    },
    input: {
        // height: 30,
        width: 350,
        backgroundColor: 'lightgray'
    },
});