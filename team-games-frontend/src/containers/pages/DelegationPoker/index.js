import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import {
	Col,
	Row,
} from 'reactstrap';

import DefaultLayout from '../../templates/Default';
import { SmallCard } from '../../../components/organisms';

import { BsFillPlusCircleFill, BsFillPlayFill } from "react-icons/bs";


class DelegationPoker extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
	}

	createRoom = async () => {
		console.log("CLICK");
		this.props.history.push('/delegationpoker/create', {});
	}

	playRoom = async () => {
		console.log("CLICK");
		this.props.history.push('/delegationpoker/play', {});
	}

	render() {

		return (
			<DefaultLayout className='delegation options'>
				<div className='principal'>
					<div className='notice'>
						<h1>Delegation Poker</h1>
						<p>The objective of Delegation Poker is to drive home the idea of delegating decisions and tasks to your team within a controlled environment. The method is a technique of <a href="https://management30.com/practice/delegation-poker/">Management 3.0</a>.</p>
						<p>Team members will repeat the following steps for each pre-defined case:</p>
						<ol>
							<li>
								One person picks out a situation to read aloud OR he tells a story from personal experience.
							</li>
							<li>
								Each player chooses one of the seven delegation cards privately, reflecting on how she would delegate the decision in that particular situation.
							</li>
							<li>
								Once all players have decided, they can then reveal their selected cards.
							</li>
							<li>
								Everyone earns points according to the value of thei card, except the players that are the “highest minority” (see below).
							</li>
							<li>
								Let the people with the highest and the lowest cards explain the reasoning behind their choices.
							</li>
							<li>
								You can then create a Delegation Board to show the results of your consensus.
							</li>
						</ol>
					</div>
					<div class="action">
						<Row>
							<Col>
								<SmallCard
									mainText="delegationpoker.options.create.title"
									smallText="delegationpoker.options.create.text"
									buttonName="delegationpoker.options.create.button"
									icon={<BsFillPlusCircleFill />}
									className="create"
									onClick={this.createRoom}
								/>
							</Col>
							<Col>
								<SmallCard
									mainText="delegationpoker.options.play.title"
									smallText="delegationpoker.options.play.text"
									buttonName="delegationpoker.options.play.button"
									icon={<BsFillPlayFill />}
									className="play"
									onClick={this.playRoom}
								/>
							</Col>
						</Row>
					</div>
				</div>
			</DefaultLayout >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DelegationPoker));
