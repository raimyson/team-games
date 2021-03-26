import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import {
	Col,
	Row,
	Card,
	CardText,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Alert
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import DefaultLayout from '../../templates/Default';
import findMovingMotivatorsByRoom from '../../../integration/actions/movingmotivators/movingMotivatorsByRoom';
import enterRoomMovingMotivators from '../../../integration/actions/movingmotivators/enterMovingMotivators';

class MovingMotivatorsPlay extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		const search = this.props.location.search; // could be '?foo=bar'
		const params = new URLSearchParams(search);
		const code = params.get('id'); // bar

		if (code) {
			this.props.findMovingMotivatorsByRoom({ "code": code });
			this.setState({ "code": code })
		}
	}

	state = {
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	enterRoom = async () => {
		let param = JSON.parse(JSON.stringify(this.state));
		await this.props.enterRoomMovingMotivators(param)
			.then(({ data: response }) => {
				if (!this.props.enterMovingMotivators.error) {
					response.user = this.state.name
					this.props.history.push('/movingmotivators/room', {
						request: response
					});
				}

			})
			.catch((error) => {
				console.log("Erro ao acessar jogo")
			});
		;
	}

	loading = () => <div className='animated fadeIn pt-1 text-center'>Loading...</div>;


	render() {
		return (
			<DefaultLayout className='moving create'>
				<div className='principal'>
					<Row>
						<Col>
							{this.props.movingMotivatorsByRoom.loading ? this.loading() : (
								<Card body className="create">
									<CardText>
										{this.props.movingMotivatorsByRoom.error ? (
											<Alert color="danger">
												<FormattedMessage id="movingmotivator.play.code.error" />
											</Alert>
										) : (<></>)}
										{this.props.enterMovingMotivators.error ? (
											<Alert color="danger">
												<FormattedMessage id="movingmotivator.play.enter.error" />
											</Alert>
										) : (<></>)}
										<Form>
											<FormGroup>
												<Label for="name"><FormattedMessage id="movingmotivator.play.name.title" /></Label>
												<Input type="name" name="name" id="name" onChange={this.handleInputChange} />
											</FormGroup>
											<FormGroup>
												<Label for="code"><FormattedMessage id="movingmotivator.play.code.title" /></Label>
												<Input type="code" name="code" id="code" onChange={this.handleInputChange} value={this.state.code} />
											</FormGroup>
										</Form>
									</CardText>
									<Button onClick={() => this.enterRoom()} ><FormattedMessage id="movingmotivator.play.button.title" /></Button>
								</Card>
							)}
						</Col>
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
			findMovingMotivatorsByRoom,
			enterRoomMovingMotivators
		},
		dispatch,
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovingMotivatorsPlay));
