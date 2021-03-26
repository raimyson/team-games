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
import findDelegationPokerByRoom from '../../../integration/actions/delegationpoker/delegationPokerByRoom';
import enterRoomDelegationPoker from '../../../integration/actions/delegationpoker/enterDelegationPoker';

class DelegationPokerPlay extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	componentDidMount() {
		const search = this.props.location.search; // could be '?foo=bar'
		const params = new URLSearchParams(search);
		const code = params.get('id'); // bar

		if (code) {
			this.props.findDelegationPokerByRoom({ "code": code });
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

	handleKeyDown(e) {
		if (e.key === 'Enter') {
			console.log('do validate');
			this.enterRoom();
		}
	}

	enterRoom = async () => {
		let param = JSON.parse(JSON.stringify(this.state));
		if (param.name && param.name.length > 3 && param.code && param.code.length >= 5) {
			await this.props.enterRoomDelegationPoker(param)
				.then(({ data: response }) => {
					if (!this.props.enterDelegationPoker.error) {
						response.user = this.state.name
						this.props.history.push('/delegationpoker/room', {
							request: response
						});
					}

				})
				.catch((error) => {
					console.log("Erro ao acessar jogo")
				});
		} else {
			console.log("Parametros inválidos")
		}

	}

	loading = () => <div className='animated fadeIn pt-1 text-center'>Loading...</div>;


	render() {
		return (
			<DefaultLayout className='delegation create'>
				<div className='principal'>
					<Row>
						<Col>
							{this.props.delegationPokerByRoom.loading ? this.loading() : (
								<Card body className="create">
									<CardText>
										{this.props.delegationPokerByRoom.error ? (
											<Alert color="danger">
												<FormattedMessage id="movingmotivator.play.code.error" />
											</Alert>
										) : (<></>)}
										{this.props.enterDelegationPoker.error ? (
											<Alert color="danger">
												<FormattedMessage id="movingmotivator.play.enter.error" />
											</Alert>
										) : (<></>)}
										<Form>
											<FormGroup>
												<Label for="name"><FormattedMessage id="movingmotivator.play.name.title" /></Label>
												<Input type="name" name="name" id="name" onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} />
											</FormGroup>
											<FormGroup>
												<Label for="code"><FormattedMessage id="movingmotivator.play.code.title" /></Label>
												<Input type="code" name="code" id="code" value={this.state.code} onChange={this.handleInputChange} onKeyDown={this.handleKeyDown} />
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
			findDelegationPokerByRoom,
			enterRoomDelegationPoker
		},
		dispatch,
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DelegationPokerPlay));
