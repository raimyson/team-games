import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Helmet} from 'react-helmet';

import './App.scss';
import Routes from './routes.js';

class App extends React.Component {
	render() {
		return (
			<Fragment>
				<Helmet>
					<meta charSet='utf-8' />
				</Helmet>
				<Routes />
			</Fragment>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default withRouter(connect(mapStateToProps, null)(App));
