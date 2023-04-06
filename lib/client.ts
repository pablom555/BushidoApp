import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import Cookies from "universal-cookie";
import { BACKEND_GQL_URI } from "../constants";


let client: ApolloClient<any> | null = null;

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    const httpLink = new HttpLink({ uri: BACKEND_GQL_URI });

    const authLink = new ApolloLink((operation, forward) => {
      const cookie = new Cookies();
      const token = cookie.get('bushidoToken');
    
      operation.setContext({
        headers: {
          authorization: token ? `Bearer ${token}` : ''
        }
      });
    
      return forward(operation);
    });

    client = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    });
  }

  return client;
};
