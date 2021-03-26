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


class MovingMotivators extends React.Component {
	constructor(props) {
		super(props);
	}

	state = {
	}

	createRoom = async () => {
		console.log("CLICK");
		this.props.history.push('/movingmotivators/create', {});
	}

	playRoom = async () => {
		console.log("CLICK");
		this.props.history.push('/movingmotivators/play', {});
	}

	render() {

		return (
			<DefaultLayout className='moving options'>
				<div className='principal'>
					<div className='notice'>
						<h1>Moving Motivators</h1>
						<p>Moving Motivators use a card set as metaphors to reflect on people's motivation and how it is affected by organisational change. It is based on the model of ten intrinsic desires,  which motivates us most. The method is a technique of <a href="https://management30.com/practice/moving-motivators/">Management 3.0</a>.</p>
						<p>Moving Motivator is a deck of 10 cards, each one represent a business related intrinsic motivator :</p>
						<ul>
							<li>
								<b>Curiosity:</b> I have plenty of things to investigate and to think about
							</li>
							<li>
								<b>Honor:</b> I feel proud that my personal values are reflected in how I work.
							</li>
							<li>
								<b>Acceptance:</b> The people around me approve of what I do and who I am.
							</li>
							<li>
								<b>Mastery:</b> My work challenges my competence but it is still within my abilities.
							</li>
							<li>
								<b>Power:</b> There’s enough room for me to influence what happens around me.
							</li>
							<li>
								<b>Freedom:</b> I am independent of others with my work and my responsibilities.
							</li>
							<li>
								<b>Relatedness:</b> I have good social contacts with the people in my work.
							</li>
							<li>
								<b>Order:</b> There are enough rules and policies for a stable environment.
							</li>
							<li>
								<b>Goal:</b> My purpose in life is reflected in the work that I do.
							</li>
							<li>
								<b>Status:</b> My position is good, and recognized by the people who work with me.
							</li>
						</ul>
					</div>
					<div class="action">
						<Row>
							<Col>
								<SmallCard
									mainText="movingmotivator.options.create.title"
									smallText="movingmotivator.options.create.text"
									buttonName="movingmotivator.options.create.button"
									icon={<BsFillPlusCircleFill />}
									className="create"
									onClick={this.createRoom}
								/>
							</Col>
							<Col>
								<SmallCard
									mainText="movingmotivator.options.play.title"
									smallText="movingmotivator.options.play.text"
									buttonName="movingmotivator.options.play.button"
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovingMotivators));
