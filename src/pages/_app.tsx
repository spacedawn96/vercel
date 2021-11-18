import Router from 'next/router';
import NProgress from 'nprogress'; //nprogress module
import React from 'react';
import '../styles/global.css';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../lib/apollo';
import { Provider } from 'react-redux';
import store from 'src/store/store';
import { ToastProvider } from 'react-toast-notifications';

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <ToastProvider placement="bottom-right">
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ToastProvider>
    </Provider>
  );
}
