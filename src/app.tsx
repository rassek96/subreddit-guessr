import * as React from 'react';
import {Main} from './components/main'
import {TopBar} from './components/topBar'

export const App = () => (
  <div id='container'>
    <TopBar />
    <Main />
  </div>
)