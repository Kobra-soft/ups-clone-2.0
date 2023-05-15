import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigator/RootNavigator';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
  /* uri: 'https://flyby-router-demo.herokuapp.com/', */
   uri: 'http://192.168.0.44:5001/api/api/ordered-wolverine',
/*   uri: 'https://guabiruba.stepzen.net/api/ordered-wolverine/__graphql', */
  /* uri: 'http://localhost:5001/api/ordered-wolverine', */
  cache: new InMemoryCache(),
});

export default function App() {
  return (

    // @ts-ignore - TailwindProvider is missing a type definition
    <TailwindProvider utilities={utilities}>
      <ApolloProvider client={client}>
      <NavigationContainer>
      <RootNavigator/>
      </NavigationContainer>
      </ApolloProvider>
    </TailwindProvider>
  );
}
