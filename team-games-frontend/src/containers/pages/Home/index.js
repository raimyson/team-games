import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import {
	Link
} from 'react-router-dom';

import {
	Card,
	CardText,
	CardTitle,
	Col,
	Row,
	Button,
	Fade
} from 'reactstrap';

import DefaultLayout from '../../templates/Default';
import { Widget } from '../../../components/organisms';

import ColorUtil from '../../../utils/ColorUtil';
import { FormattedMessage } from 'react-intl';

class Home extends React.Component {
	constructor(props) {
		super(props);

		this.selectColor = ColorUtil.selectColor;
	}

	state = {
		fadeIn: true,
		timeout: 300,
		programCollapse: true,
		program: [],
	}

	componentDidMount() {
		//this.props.findAllPrograms();
	}

	toggleProgram = () => {
		this.setState({ programCollapse: !this.state.programCollapse });
	}

	loading = () => <div className='animated fadeIn pt-1 text-center'>Loading...</div>;

	render() {
		return (
			<DefaultLayout className='home'>
				<div className='animated fadeIn'>
					<Row >
						<Col className="cards">
							<Card body className="cardMovingMotivator">
								<CardTitle><FormattedMessage id="home.card.movingmotivators.title" /></CardTitle>
								<CardText><FormattedMessage id="home.card.movingmotivators.text" /></CardText>
								<Link to="/movingmotivators">
									<Button><FormattedMessage id="home.card.movingmotivators.button" /></Button>
								</Link>
							</Card>
						</Col>
						{/*<Col className="cards">
							<Card body className="cardDelegationPoker">
								<CardTitle><FormattedMessage id="home.card.delegationpoker.title" /></CardTitle>
								<CardText><FormattedMessage id="home.card.delegationpoker.text" /></CardText>
								<Link to="/delegationpoker">
									<Button><FormattedMessage id="home.card.delegationpoker.button" /></Button>
								</Link>
							</Card>
						</Col>*/}
					</Row>
				</div>
			</DefaultLayout>
		)
	}
}

const mapStateToProps = state => ({
	...state,
});

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
		},
		dispatch,
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
