import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import {
	Col,
	Row,
	Card,
	CardText,
	CardTitle,
	Button, Form, FormGroup, Label, Input, Alert
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import DefaultLayout from '../../templates/Default';
import createRoomDelegationPoker from '../../../integration/actions/delegationpoker/createDelegationPoker';


class DelegationPokerCreate extends React.Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	state = {
		visibility: "all"
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	createRoom = async () => {
		let param = JSON.parse(JSON.stringify(this.state));
		this.props.createRoomDelegationPoker(param);
	}

	loading = () => <div className='animated fadeIn pt-1 text-center'>Loading...</div>;

	copyTextToClipboard(text) {
		var textArea = document.createElement("textarea");

		//
		// *** This styling is an extra step which is likely not required. ***
		//
		// Why is it here? To ensure:
		// 1. the element is able to have focus and selection.
		// 2. if element was to flash render it has minimal visual impact.
		// 3. less flakyness with selection and copying which **might** occur if
		//    the textarea element is not visible.
		//
		// The likelihood is the element won't even render, not even a
		// flash, so some of these are just precautions. However in
		// Internet Explorer the element is visible whilst the popup
		// box asking the user for permission for the web page to
		// copy to the clipboard.
		//

		// Place in top-left corner of screen regardless of scroll position.
		textArea.style.position = 'fixed';
		textArea.style.top = 0;
		textArea.style.left = 0;

		// Ensure it has a small width and height. Setting to 1px / 1em
		// doesn't work as this gives a negative w/h on some browsers.
		textArea.style.width = '2em';
		textArea.style.height = '2em';

		// We don't need padding, reducing the size if it does flash render.
		textArea.style.padding = 0;

		// Clean up any borders.
		textArea.style.border = 'none';
		textArea.style.outline = 'none';
		textArea.style.boxShadow = 'none';

		// Avoid flash of white box if rendered for any reason.
		textArea.style.background = 'transparent';


		textArea.value = text;

		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			var successful = document.execCommand('copy');
			var msg = successful ? 'successful' : 'unsuccessful';
			console.log('Copying text command was ' + msg);
		} catch (err) {
			console.log('Oops, unable to copy');
		}

		document.body.removeChild(textArea);
	}


	render() {
		return (
			<DefaultLayout className='delegation create'>
				<div className='principal'>
					<Row>
						<Col>
							{this.props.createDelegationPoker.loading ? this.loading() : (
								<Card body className="create">
									{this.props.createDelegationPoker.data && this.props.createDelegationPoker.data.id ? (
										<>
											<CardTitle>
												<h4>
													<FormattedMessage id="delegationpoker.create.sucess.title" />
												</h4>
											</CardTitle>
											<CardText className="sucess">
												<FormattedMessage id="delegationpoker.create.sucess.text.participants" />
												<span className="url">{'http://localhost/delegationpoker/play?id=' + this.props.createDelegationPoker.data.id.substring(0, 5)}</span>
												<Button onClick={() => this.copyTextToClipboard('http://localhost/delegationpoker/play?id=' + this.props.createDelegationPoker.data.id.substring(0, 5))} ><FormattedMessage id="delegationpoker.create.sucess.button.title" /></Button>
												<FormattedMessage id="delegationpoker.create.sucess.text.admin" />
												<span className="url">{'http://localhost/delegationpoker/play?id=' + this.props.createDelegationPoker.data.id}</span>
												<Button onClick={() => this.copyTextToClipboard('http://localhost/delegationpoker/play?id=' + this.props.createDelegationPoker.data.id)} ><FormattedMessage id="delegationpoker.create.sucess.button.title" /></Button>
											</CardText>
										</>
									) : (
											<>
												<CardText>
													{this.props.createDelegationPoker.error ? (
														<Alert color="danger">
															<FormattedMessage id="delegationpoker.create.error.title" />
														</Alert>
													) : (<></>)}
													<Form>
														<FormGroup>
															<Label for="name"><FormattedMessage id="delegationpoker.create.name.title" /></Label>
															<Input type="name" name="name" id="name" onChange={this.handleInputChange} />
														</FormGroup>
														<FormGroup>
															<Label for="email"><FormattedMessage id="delegationpoker.create.email.title" /></Label>
															<Input type="email" name="email" id="email" onChange={this.handleInputChange} />
														</FormGroup>														
													</Form>
													<FormGroup>
															<Label for="visibility"><FormattedMessage id="movingmotivator.create.visibility.title" /></Label>
															<Input type="select" name="visibility" id="visibility" onChange={this.handleInputChange}>
																<FormattedMessage id="movingmotivator.create.visibility.all">
																	{text =>
																		<option value="all">{text}</option>
																	}
																</FormattedMessage>
																<FormattedMessage id="movingmotivator.create.visibility.alone">
																	{text =>
																		<option value="alone">{text}</option>
																	}
																</FormattedMessage>
															</Input>
														</FormGroup>
												</CardText>
												<Button onClick={() => this.createRoom()} ><FormattedMessage id="delegationpoker.create.button.title" /></Button>
											</>
										)}
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
			createRoomDelegationPoker
		},
		dispatch,
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DelegationPokerCreate));
