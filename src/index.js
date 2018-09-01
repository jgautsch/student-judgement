// @ts-check
import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import 'bulma/css/bulma.css';
import 'rc-slider/assets/index.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



if (process.env.NODE_ENV === "production") {
  ReactGA.initialize('UA-125020636-2');
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
