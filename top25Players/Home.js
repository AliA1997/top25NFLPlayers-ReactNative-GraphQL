//import react and PureComponent from react.
import React, { PureComponent } from 'react';
//import image from your root.
import footBallImage from './football.png';
//import the UI needed from react native
import { View, Text, StyleSheet, Platform, Image } from 'react-native';

//Define your component
class Home extends PureComponent {
    //Add navigationOPtions giving it a special label in your sidemenu.
    static navigationOptions = {
        drawerLabel: "Home"
    }
    render() {
        //Render your component so have your UI set to your stylesheet variable.
        return (
            <View style={styles.container}>
                <Image source={footBallImage} style={styles.image} />
                <Text style={styles.text}>Home</Text>
                <Text style={styles.text}>The Best 25 NFL Players.</Text>
                {/* Add a text where your would click it to open your side menu. */}
                <Text style={styles.drawerText} onPress={() => this.props.navigation.openDrawer()}>Open Drawer</Text>
            </View>
        )
    }
}

//Define the styles for the component
const styles = StyleSheet.create({
    container: {
        //Instead of doing height and width 100%, just do flex: 1, and have justifyContent and ALignItems set to center.
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 23,
        fontWeight: '800',
        //Make the font family Platform specific.
        fontFamily: Platform.select({
            ios: 'Chalkboard SE',
            android: 'sans-serif-condensed'
        })
    },
    image: {
        height: 150,
        width: 150,
    },
    //Define your drawerText for your drawer text/button
    drawerText: {
        color: '#33FF58',
    }
})

//Export the component
export default Home;