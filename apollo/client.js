import { onError } from 'apollo-link-error'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory'
import environ from '../env'

export default function createApolloClient(ctx) {
  const token = ''
  const cache = new InMemoryCache()
  const httpLink = createHttpLink({
    uri: environ.API_URL + 'graphql/',
    headers: token
      ? {
          authorization: token || null,
        }
      : {},
  })

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      if (graphQLErrors[0].message === 'Signature has expired.') {
        if (process.browser) {
          ctx.$auth.setToken('local', null)
          ctx.app.$cookies.set('auth._token.local', null)
          ctx.app.$cookies.set('auth.user', null)
          ctx.$auth.logout()
          window.location = environ.BASE_URL
        }
      }
    }
    /* if (networkError.statusCode === 401) {
      // logout();
    } */
  })

  return {
    link: ApolloLink.from([errorLink, httpLink]),
    cache,
    defaultHttpLink: false,
  }
}
