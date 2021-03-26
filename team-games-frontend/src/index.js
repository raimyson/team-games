import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { CookiesProvider } from 'react-cookie';

import * as serviceWorker from './serviceWorker';

import configureStore from './config/store';
import App from './App';
import { en, fr, es, ptBR } from './language'; // using from the lib.

const store = configureStore({});

var locale = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage || 'en-US';
const msg = {
	'en-US': en,
	'fr-FR': fr,
	'es-ES': es,
	'pt-BR': ptBR
};

locale = 'es-ES'; //[ if you want to test for diff lang by focrcing locale ] 
const message = (locale === 'en-US') ? en : Object.assign({}, en, msg[locale]);

if (typeof document !== 'undefined') {
	const rootElement = document.getElementById('root');
	render(
		<IntlProvider locale={locale} messages={message}>
			<Provider store={store}>
				<BrowserRouter basename='/'>
					<CookiesProvider>
						<App />
					</CookiesProvider>
				</BrowserRouter>
			</Provider>
		</IntlProvider>,
		rootElement,
	);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
