import React from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools';
import { Home } from './containers';
import './App.css';
const queryCache = new QueryCache();


function App() {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <Home />
      <ReactQueryDevtools initialIsOpen />
    </ReactQueryCacheProvider>
  );
}

export default App;
