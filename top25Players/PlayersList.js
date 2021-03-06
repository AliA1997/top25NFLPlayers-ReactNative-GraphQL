//import React, and PureComponent to create a react class component
import React, { PureComponent } from 'react';
//import your UI from react-native
import { TouchableOpacity, ScrollView, Text, StyleSheet, Platform, FlatList } from 'react-native';
//import withNavigation to for updating the player's list when the graphql server is updated.
import { withNavigationFocus } from 'react-navigation';
//Import the Query component from react apollo that will responsible for retrieving data from your graphql server.
import { Query } from 'react-apollo';
//import gql from graphql-tag for making queries to our graphql server.
import gql from 'graphql-tag';

//Define your query variable which is the query responsible for retrieving data.
//It will query the each player's position, name, team, jersyNumber, and wonSuperBowl from the query's players field.
//Now alter the query to get the id to be used to retrieve a specific player.
const query = gql`
        query {
             players {
                id
                position
                name
                team
                jerseyNumber
                wonSuperBowl
            }
        }
`;

//Define your component
class PlayersList extends PureComponent {
    //Define your navigationOptions of your PlayerList component by adding a drawerLabel property 
    // which will add special characteristics to your label for this component.
    static navigationOptions = {
        drawerLabel: 'Players List',
        headerText: "Player's List"
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          // Use the `this.props.isFocused` boolean
          this.forceUpdate();
          // Call any action
        }
      }


    //Define your method for rendering each individual item
    _renderItem({item}) {
        //Return the UI
        //It will return the text green or red depending if that player won a super bowl or not.
        //Now we will edit the item to redirect the user to the Player component with thier id as an argument.
        return (
            <TouchableOpacity style={styles.itemContainer} key={item.id} onPress={() => this.props.navigation.navigate('Player', {id: item.id})}>
                <Text style={styles.itemText}>Position: {item.position}</Text>
                <Text style={styles.itemText}>Name: {item.name}</Text>
                <Text style={styles.itemText}>Team: {item.team}</Text>
                <Text style={styles.itemText}>Jersey Number: {item.jerseyNumber}</Text>
                <Text style={[styles.itemText, item.wonSuperBowl ? styles.wonSuperBowlText : styles.errorText]}>
                    Won Superbowl: {item.wonSuperBowl ? 'YES' : 'NO'}
                </Text>
            </TouchableOpacity>
        );
    }

    render() {
        //render your ui with the styles set for each ui element.
        return (
            <ScrollView style={styles.container}>
                {/*Can use an array to override styles for your UI elements.*/}
                <Text style={[styles.itemText, styles.headerText]}>Top 25 NFL Players List</Text>
                {/* Enable Open Drawer functionality */}
                <Text style={styles.openDrawerText} onPress={() => this.props.navigation.openDrawer()}>Open Drawer</Text>

                {/*Pass a fetchPOlicy of network and cache that means you will always make a api call, and update your cache with the updated data, 
                    but you will never return data from cache unless it is hte same exact data found in api call. */}
                <Query query={query} fetchPolicy="cache-and-network">
                    {/* The props.children of the Query will be a callback with a response, and error parameter. */}
                    {(response, error) => {
                        if(error) {
                            console.log('Response Error-------', error);
                            return <Text style={styles.errorText}>{error}</Text>
                        }
                        //If the response is done, then will return the FlatList
                        if(response) {
                            //Return the FlatList if there is not an error.
                            return <FlatList 
                                        data={response.data.players}
                                        renderItem={(item) => this._renderItem(item)}
                                    />;
                        } 
                    }}
                </Query>
            </ScrollView>
        );
    }
}

//Define the styles for your component.
const styles = StyleSheet.create({
    container: {
        //Instead of do 100% of height and width is doing flex: 1,
        flex: 1,
    },
    headerText: {
        fontSize: 30,
        marginTop: 30,
    },
    itemContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: 'black'
    },
    itemText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        })
    },
    errorText: {
        fontSize: 20,
        fontWeight: '500',
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        }),
        color: 'red'
    },
    wonSuperBowlText: {
        color: 'green',
    },
    openDrawerText: {
        fontSize: 17,
        textAlign: 'center',
        color: '#33FF58',
    }
})

//Export the component
export default PlayersList;