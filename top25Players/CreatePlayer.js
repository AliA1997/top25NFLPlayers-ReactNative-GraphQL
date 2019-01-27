//import PureComponent to use shallow comparison between props and state.
import React, { PureComponent } from 'react';
//Import your Ui, and stylesheet for styling from react-native.
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Platform } from 'react-native';
//import your Mutation component to define a mutation on your graphql server, similar to post, put or delete requests.
import { Mutation } from 'react-apollo';
//import your gql for defining your schema for your mutation from graphql-tag.
import gql from 'graphql-tag';

const createPlayerMutation = gql`
    mutation CreatePlayer($name: String!, $position: String!, $team: String!, $jerseyNumber: Int!, $wonSuperBowl: Boolean!){
        createPlayer(name: $name, position: $position, team: $team, jerseyNumber: $jerseyNumber, wonSuperBowl: $wonSuperBowl) {
            name
            team
            position
            jerseyNumber
            wonSuperBowl
        }
    }
`;

export default class CreatePlayer extends PureComponent {
    constructor() {
        super();
        //Define your fields for your created player.
        this.state = {
            currentName: '',
            currentPosition: '',
            currentTeam: '',
            currentJerseyNumber: '',
            currentWonSuperBowl: false
        }
    }

    static navigationOptions = {
        drawerLabel: 'Create Player'
    }

    //Define a function that creates a player.
    createPlayerFunc(func) {
        //Destruct the state from your component's state.
        const { currentName, currentPosition, currentTeam, currentJerseyNumber, currentWonSuperBowl } = this.state;
        //Assign a object that will be used for hte mutation.
        const newPlayer = {
            name: currentName,
            position: currentPosition,
            team: currentTeam,
            jerseyNumber: parseInt(currentJerseyNumber),
            wonSuperBowl: currentWonSuperBowl
        }

        //Log the player into the console.
        console.log("newPlayer----------", newPlayer);

        //THen pass your newPlayer object as variables to the func argument which is the mutation func of the graphql server.
        func({ variables: newPlayer });

        //ALert that the player is created
        alert('Player Created!!!');
        //Navigate to home
        this.props.navigation.navigate('Home');
        //Or navigate to the list of players list.
        //this.props.navigation.navigate('PlayersList');
    }

    render() {
        /* */
        /*Pass your mutation schema, and arguments for the mutation.*/
        return (
            <View>
                <Text style={styles.header}>Create Player</Text>
                <Text style={styles.label}>Name</Text>
                <TextInput style={styles.input} onChangeText={text => this.setState({currentName: text})}
                    value={this.state.currentName}/>
                <Text style={styles.label}>Position</Text>
                <TextInput style={styles.input} onChangeText={text => this.setState({currentPosition: text})}
                    value={this.state.currentPosition} />
                <Text style={styles.label}>Team</Text>
                <TextInput style={styles.input} onChangeText={text => this.setState({currentTeam: text})}
                    value={this.state.currentTeam} />
                <Text style={styles.label}>Jersey Number</Text>
                <TextInput style={styles.input} onChangeText={text => this.setState({currentJerseyNumber: text})} 
                    value={this.state.currentJerseyNumber}/>
                <Text style={styles.label}>Won Super Bowl.</Text>
                <View style={styles.buttonView}>
                    {/*Have two buttons indicating if they won a super bowl or not. */}
                    <TouchableOpacity style={[styles.button, styles.yesButton]} onPress={() => this.setState({currentWonSuperBowl: true})}>
                        <Text style={styles.buttonText}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity title="No"  style={[styles.button, styles.noButton]} onPress={() => this.setState({currentWonSuperBowl: false})}>
                        <Text style={styles.buttonText}>No</Text>
                    </TouchableOpacity>
                </View>
                <Mutation
                        mutation={createPlayerMutation}
                >
                        {(createPlayer,  error) => {
                            console.log('error-----------', error)
                            //If there is an error throw the error
                            if(error) {
                                console.log('error----------', error);
                            }
                            if(createPlayer) {
                                //If the response has data load the response data via the createPlayer property.
                                return (
                                    <TouchableOpacity onPress={() => this.createPlayerFunc(createPlayer)} style={styles.submitButton}>
                                        <Text style={styles.buttonText}>Create Player</Text>
                                    </TouchableOpacity>
                                );
                            }

                            //By default it is loading the result so just return loading...
                            return <Text>Loading...</Text>
                        }}
                </Mutation>
            </View>
        );
    }
}

//Define your styles using the StyleSheet import from react-native.
const styles = StyleSheet.create({
    //Define your header styles.
    header: {
        fontSize: 30,
        //Make the font family Platform specific.
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        })
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
    label: {
        fontSize: 20,
        //Make the font family Platform specific.
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
    submitButton: {
        marginTop: 100,
        marginLeft: 75,
        marginRight: 75,
        width: 200,
        backgroundColor: 'blue'
    }
});