import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import {
	Alert, Button, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Input, TabContent, TabPane
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import DefaultLayout from '../../templates/Default';
import { Box, Boxable } from '../../../components';
import { FcPlus, FcStart, FcRefresh, FcOk } from "react-icons/fc";
import { CgSmileSad, CgSmileNeutral, CgSmile, CgTrash } from "react-icons/cg";
import findDelegationPokerByRoom from '../../../integration/actions/delegationpoker/delegationPokerByRoom';
import createDecisionDelegationPokerByRoom from '../../../integration/actions/delegationpoker/createDecisionDelegationPoker';
import removeDecisionDelegationPokerByRoom from '../../../integration/actions/delegationpoker/removeDecisionDelegationPoker';
import startDecisionDelegationPokerByRoom from '../../../integration/actions/delegationpoker/startDecisionDelegationPoker';
import associateCardDelegationPokerByRoom from '../../../integration/actions/delegationpoker/associateCardDelegationPoker';


class DelegationPokerRoom extends React.Component {
	constructor(props) {
		super(props);

		if (!this.props.history.location.state.request) {
			this.props.history.push('/delegationpoker/play', {});
			return;
		}

		this.state = {
			user: this.props.history.location.state.request.user,
			code: this.props.history.location.state.request.room.roomkey,
			admin: this.props.history.location.state.request.admin,
			modal: false,
			decision: [],
			activeTab: this.props.history.location.state.request.admin ? "1" : "2",
			people: []
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.createNewDecision = this.createNewDecision.bind(this);
		this.toggleTab = this.toggleTab.bind(this);
		this.associateCard = this.associateCard.bind(this);
	}

	componentDidMount() {
		this.getPeople();
		// this.timerId = setInterval(() => this.getPeople(), 10000);
	}

	componentWillUnmount() {
		// clearInterval(this.timerId)
	}

	async getPeople() {
		await this.props.findDelegationPokerByRoom({ "code": this.state.code, "name": this.state.user });
		if (this.props.delegationPokerByRoom && this.props.delegationPokerByRoom.data
			&& this.props.delegationPokerByRoom.data.people && this.props.delegationPokerByRoom.data.people.length > 0) {

			this.valideUser();

			this.setState({
				people: this.mountPeople(),
				decision: this.mountDecision()
			});
		}
	}

	valideUser() {
		if (this.props.delegationPokerByRoom.data.people.findIndex(obj => obj.name == this.state.user) == -1) {
			this.props.history.push('/delegationpoker/play', {});
			return;
		}
	}

	valideUserPlayedCurrent() {

		let listPlayed = [];

		let decision = this.props.delegationPokerByRoom.data.decision;

		//validates if there is a decision in room		
		if (decision == undefined || decision.length == 0) {
			return listPlayed;
		}
		//validates if there is a current room started
		const indCurrent = decision.findIndex(obj => obj.visibility == 1)
		if (indCurrent == -1) {
			return listPlayed;
		}

		//validates if there is a current room started
		const currentDecicion = decision[indCurrent]
		if (currentDecicion) {
			const columns = Object.keys(currentDecicion.cards);
			const values = Object.values(currentDecicion.cards);
			for (let i = 0; i < columns.length; i++) {
				const card = currentDecicion.cards[columns[i]];
				for (let j = 0; j < card.length; j++) {
					listPlayed.push(card[j].playerid);
				}
			}
		}
		return listPlayed;
	}

	mountDecision() {

		if (this.props.delegationPokerByRoom.data.decision) {
			return this.props.delegationPokerByRoom.data.decision;
		}
		return [];
	}

	mountPeople() {
		let people = this.props.delegationPokerByRoom.data.people;
		let listPlayed = this.valideUserPlayedCurrent()
		let listPlayer = []
		for (let i = 0; i < people.length; i++) {
			const person = people[i];
			if (listPlayed.findIndex(obj => obj == person.id) == -1) {
				listPlayer.push(person);
			}
		}

		return listPlayer;
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	openModal() {
		console.log("openModal")
		this.setState({
			modal: true
		});
	}

	closeModal() {
		this.props.createDecisionDelegationPoker.error = false;
		this.setState({
			modal: undefined
		});
	}

	async createNewDecision() {
		console.log("createNewDecision");
		if (this.state.newDecision && this.state.newDecision.trim().length > 3) {
			this.setState({
				decision: [...this.state.decision, { id: "0", decision: this.state.newDecision }],
				modal: false

			})
			await this.props.createDecisionDelegationPokerByRoom({ "code": this.state.code, "name": this.state.user, "decision": this.state.newDecision });
		} else {
			this.props.createDecisionDelegationPoker.error = true;
		}
	}
	async startNewDecision() {
		console.log("startNewDecision");
		let decision = this.state.decision.find(obj => obj.visibility == "1");
		if (decision) {
			return;
		}
		decision = this.state.decision.find(obj => obj.visibility == "0");
		if (decision) {
			let request = {
				"code": this.state.code,
				"name": this.state.user,
				"decision": decision.id
			}
			await this.props.startDecisionDelegationPokerByRoom(request);
		}
	}
	startDecisionAgain() {
		console.log("startDecisionAgain");
	}
	finishDecision() {
		console.log("finishDecision");
	}
	async removeDecision(idDecision) {
		console.log("removeDecision: " + idDecision);

		if (idDecision) {
			this.setState({
				decision: this.state.decision.filter(obj => obj.id != idDecision)
			})
			await this.props.removeDecisionDelegationPokerByRoom({ "code": this.state.code, "name": this.state.user, "decision": idDecision });
		}
	}

	async associateCard(idBox) {
		console.log("associateCard: " + idBox);
		let decision = this.state.decision.find(obj => obj.visibility == "1");
		let request = {
			"code": this.state.code,
			"name": this.state.user,
			"decision": decision.id,
			"card": idBox
		}
		await this.props.associateCardDelegationPokerByRoom(request);
	}

	toggleTab = tab => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeTab: tab
			});
		}
	}

	defineColor = (item, index) => {
		if (item.visibility == 1) {
			return "divTableRow active";
		} else if (index % 2 == 0) {
			return "divTableRow lightgray";
		}
		return "divTableRow";
	}


	render() {



		return (
			<DefaultLayout className='delegation room'>
				<div className='principal'>
					<div class="divTable">
						<div class="divTableBody">
							<div class="divTableRow">
								<div class="divTableCell command">

									<Nav tabs>
										{this.state.admin && (<NavItem >
											<NavLink
												className={this.state.activeTab === '1' ? "active" : ""}
												onClick={() => { this.toggleTab('1'); }}
											>
												Actions
											</NavLink>
										</NavItem>)}
										<NavItem>
											<NavLink
												className={this.state.activeTab === '2' ? "active" : ""}
												onClick={() => { this.toggleTab('2'); }}
											>
												Players
											</NavLink>
										</NavItem>
									</Nav>
									<TabContent activeTab={this.state.activeTab}>
										{this.state.admin && (
											<TabPane tabId="1" className="actions">
												<div class="action" onClick={this.openModal}><FcPlus /><FormattedMessage id="delegationpoker.room.action.decision.new" /></div>
												<div class="action" onClick={() => this.startNewDecision()}><FcStart /><FormattedMessage id="delegationpoker.room.action.decision.start" /></div>
												<div class="action" onClick={() => this.startDecisionAgain()}><FcRefresh /><FormattedMessage id="delegationpoker.room.action.decision.again" /></div>
												<div class="action" onClick={() => this.finishDecision()}><FcOk /><FormattedMessage id="delegationpoker.room.action.decision.finish" /></div>
											</TabPane>
										)}
										<TabPane tabId="2" className="box_item_component players">
											{this.state.people && this.state.people.length > 0 && this.state.people.map((item, index) => (
												<>
													{item.name == this.state.user ? (
														<Boxable targetKey="box" label={item.name} />
													) : (
															<div className="outer">
																<div className="item red">
																	<span className="grabber">&#215;</span>
																	{item.name}
																</div>
															</div>
														)
													}
												</>
											))}
										</TabPane>

									</TabContent>
								</div>
								<div class="divTableCell card tell">
									<div class="title"><FormattedMessage id="delegationpoker.room.card.tell.title" /></div>
									<div class="text"><FormattedMessage id="delegationpoker.room.card.tell.text" /></div>
								</div>
								<div class="divTableCell card sell">
									<div class="title"><FormattedMessage id="delegationpoker.room.card.sell.title" /></div>
									<div class="text"><FormattedMessage id="delegationpoker.room.card.sell.text" /></div>
								</div>
								<div class="divTableCell card consult">
									<div class="title"><FormattedMessage id="delegationpoker.room.card.consult.title" /></div>
									<div class="text"><FormattedMessage id="delegationpoker.room.card.consult.text" /></div>
								</div>
								<div class="divTableCell card agree">
									<div class="title"><FormattedMessage id="delegationpoker.room.card.agree.title" /></div>
									<div class="text"><FormattedMessage id="delegationpoker.room.card.agree.text" /></div>
								</div>
								<div class="divTableCell card advise">
									<div class="title"><FormattedMessage id="delegationpoker.room.card.advise.title" /></div>
									<div class="text"><FormattedMessage id="delegationpoker.room.card.advise.text" /></div>
								</div>
								<div class="divTableCell card inquire">
									<div class="title"><FormattedMessage id="delegationpoker.room.card.inquire.title" /></div>
									<div class="text"><FormattedMessage id="delegationpoker.room.card.inquire.text" /></div>
								</div>
								<div class="divTableCell card delegate">
									<div class="title"><FormattedMessage id="delegationpoker.room.card.delegate.title" /></div>
									<div class="text"><FormattedMessage id="delegationpoker.room.card.delegate.text" /></div>
								</div>
							</div>
							{this.state.decision && this.state.decision.length > 0 && this.state.decision.map((item, index) => (

								<div class={this.defineColor(item, index)}>
									<div class="divTableCell decision"><div>{this.state.admin == true && (<CgTrash onClick={() => this.removeDecision(item.id)} />)}{item.decision}</div></div>
									<div class="divTableCell select">
										{item.visibility == "1" && (<Box targetKey="box" card="1" onChange={this.associateCard} />)}
										{item.cards != undefined && item.cards[1] != undefined && item.cards[1].map((card, indexCard) => (
											<div className="outer">
												<div className="item red">
													<span className="grabber">&#215;</span>
													{card.name}
												</div>
											</div>
										))}
									</div>
									<div class="divTableCell select">
										{item.visibility == "1" && (<Box targetKey="box" card="2" onChange={this.associateCard} />)}
										{item.cards != undefined && item.cards[2] != undefined && item.cards[2].map((card, indexCard) => (
											<div className="outer">
												<div className="item red">
													<span className="grabber">&#215;</span>
													{card.name}
												</div>
											</div>
										))}
									</div>
									<div class="divTableCell select">
										{item.visibility == "1" && (<Box targetKey="box" card="3" onChange={this.associateCard} />)}
										{item.cards != undefined && item.cards[3] != undefined && item.cards[3].map((card, indexCard) => (
											<div className="outer">
												<div className="item red">
													<span className="grabber">&#215;</span>
													{card.name}
												</div>
											</div>
										))}
									</div>
									<div class="divTableCell select">{item.visibility == "1" && (<Box targetKey="box" card="4" onChange={this.associateCard} />)}</div>
									<div class="divTableCell select">{item.visibility == "1" && (<Box targetKey="box" card="5" onChange={this.associateCard} />)}</div>
									<div class="divTableCell select">{item.visibility == "1" && (<Box targetKey="box" card="6" onChange={this.associateCard} />)}</div>
									<div class="divTableCell select">{item.visibility == "1" && (<Box targetKey="box" card="7" onChange={this.associateCard} />)}</div>
								</div>
							))}

						</div>
					</div>
					<Modal className="modalCreateDecision" isOpen={this.state.modal} toggle={this.closeModal}>
						{this.props.createDecisionDelegationPoker.error ? (
							<ModalHeader>
								<Alert color="danger">
									<FormattedMessage id="delegationpoker.create.error.title" />
								</Alert>
							</ModalHeader>
						) : (<></>)}
						<ModalBody >
							<div class="title"><FormattedMessage id={`delegationpoker.room.action.decision.form`} /></div>
							<div class="text"><Input type="text" name="newDecision" id="newDecision" onChange={this.handleInputChange} /></div>
						</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={this.createNewDecision}><FormattedMessage id={`delegationpoker.room.action.decision.form.submit`} /></Button>{' '}
							<Button color="secondary" onClick={this.closeModal}><FormattedMessage id={`delegationpoker.room.action.decision.form.cancel`} /></Button>
						</ModalFooter>
					</Modal>
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
			createDecisionDelegationPokerByRoom,
			removeDecisionDelegationPokerByRoom,
			startDecisionDelegationPokerByRoom,
			associateCardDelegationPokerByRoom
		},
		dispatch,
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DelegationPokerRoom));
