import React from 'react';
import { StyleSheet } from 'react-native';
import { GraphQLClient, ClientContext } from 'graphql-hooks'

import Navigation from './navigation';

const client = new GraphQLClient({
  url: 'https://b0785ec5.ngrok.io/graphql'
})

export default function App() {
  return (
    <ClientContext.Provider value={client}>
      <Navigation />
    </ClientContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'peru',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
