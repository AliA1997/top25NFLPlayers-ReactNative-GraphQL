import React, {Component} from 'react';
//import your Platform for conditionally change the url based if it is on ios or android. 
//Since on android you would have set the url to your emulator, while on ios it would be set to localhost.
import { Platform } from 'react-native';
//import your ApolloProvider from react-apollo to wrap your app.
import { ApolloProvider} from 'react-apollo'; 
//import ApolloClient, InMemoryCache, and HttpLink to define your client to cnnect to your graphql server.//#endregion
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-client-preset';
//import your Navigator so your application renders the initial route
import Navigator from './Navigator';

//Define your client for your APolloProvider connecting to your graphql server.
const client = new ApolloClient({
  //Assign to your cache property a instance of a InMemoryCache
  //Since we will be returning an optimistic response, we will set our dataIdFromObject
  // and set our addTypeName to false since we are not differentiating between types since there is only one type=Player. 
  cache: new InMemoryCache({
    //In our callback for our dataIdFromObject return the key of the result or have it set to null.
    dataIdFromObject: result => result.key || null,
    //Else have the addTypeName to false.
    addTypename: false
  }),
  
  //Assign your link with a new instance of a HttpLink linking to your graphql server.
  link: new HttpLink({uri: Platform.select({
    ios: 'http://localhost:4000/graphql',
    android: 'http://10.0.2.2:4000/graphql'
  }),
  //Enable your queries to hit getEndpoints
  //To make your definition of your apollo-client more developer friendly
  useGETForQueries: true
})
})


type Props = {};
export default class App extends Component<Props> {
  render() {
    //Wrap your App with apolloProvider with your defined client.
    return (
      <ApolloProvider client={client}>
        <Navigator />
      </ApolloProvider>
    );
  }
}
