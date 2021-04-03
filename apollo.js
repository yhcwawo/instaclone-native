import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";

export const isLoggedInVar = makeVar(false);
export const tokenVar = makeVar("");

const TOKEN = "token";

export const logUserIn = async(token) => {
    await AsyncStorage.setItem(TOKEN,token);
    isLoggedInVar(true);
    tokenVar(token);
};

export const logUserOut = async()=> {
    await AsyncStorage.removeItem(TOKEN);
    isLoggedInVar(false);
    tokenVar(null);
}

const httpLink = createHttpLink({});

const uploadHttpLink = createUploadLink({
    uri: "http://39e8fa325fd6.ngrok.io/graphql",
});

const authLink = setContext((_,{headers}) => {
    return {
        headers: {
            ...headers,
            "token": tokenVar()
        },
    };
});

const onErrorLink = onError(({graphQLErrors, networkError}) => {
    if(graphQLErrors){
        console.log(`Graphql Error`,graphQLErrors);
    }

    if(networkError){
        console.log(`Network Error`,networkError);
    }
});

export const cache =  new InMemoryCache({
    typePolicies:{
        Query: {
            fields: {
                seeFeed: offsetLimitPagination(),
            },
        },
    },
});

const client = new ApolloClient({
    link: authLink.concat(onErrorLink).concat(uploadHttpLink),
    cache,
});


export default client;

