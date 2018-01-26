import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import About from './About';
import Header from './Header';
import Home from './Home';

const httpLink = createHttpLink({
    uri: '/graphql'
});
const wsLink = new WebSocketLink({
    uri: 'ws://' + window.location.host + '/subscriptions',
    options: {
        reconnect: true
    }
});
const link = split(
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link: link,
    cache: new InMemoryCache()
});

class App extends Component {
    render() {
        return (
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/about" component={About} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </ApolloProvider>
        );
    }
}

export default hot(module)(App);
