import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import {
	Modal, ModalBody
} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

import DefaultLayout from '../../templates/Default';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { MdZoomOutMap } from "react-icons/md";
import { CgSmileSad, CgSmileNeutral, CgSmile, CgTrash } from "react-icons/cg";
import updatePlayerMovingMotivators from '../../../integration/actions/movingmotivators/updateMovingMotivators';
import findMovingMotivatorsByRoom from '../../../integration/actions/movingmotivators/movingMotivatorsByRoom';
import removePlayerMovingMotivators from '../../../integration/actions/movingmotivators/removerMovingMotivators';


class MovingMotivatorsRoom extends React.Component {
	constructor(props) {
		super(props);

		if (!this.props.history.location.state.request) {
			this.props.history.push('/movingmotivators/play', {});
			return;
		}

		this.state = {
			people: undefined,
			user: this.props.history.location.state.request.user,
			code: this.props.history.location.state.request.room.roomkey,
			admin: this.props.history.location.state.request.admin,
			modal: false
		};
		this.onDragEnd = this.onDragEnd.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	componentDidMount() {
		const { history } = this.props;
		const { request } = history.location.state;
		console.log(request)
		this.getPeople();
		this.timerId = setInterval(() => this.getPeople(), 10000);
	}

	componentWillUnmount() {
		clearInterval(this.timerId)
	}

	async getPeople() {
		await this.props.findMovingMotivatorsByRoom({ "code": this.state.code, "name": this.state.user });
		if (this.props.movingMotivatorsByRoom && this.props.movingMotivatorsByRoom.data 
			&& this.props.movingMotivatorsByRoom.data.people && this.props.movingMotivatorsByRoom.data.people.length > 0){
				this.setState({
					people: this.mountPeople(this.props.movingMotivatorsByRoom.data.people)
				});
		}
	}

	mountPeople = itens => {
		let listItens = []
		for (let i = 0; i < itens.length; i++) {

			const person = itens[i];
			
			if (this.state && this.state.people && person.name == this.state.user){
				const indPerson = this.state.people.findIndex(obj => obj.name == this.state.user);
				listItens.push(this.state.people[indPerson]);
				continue;
			}	
			let newPerson = { name: person.name };
			let keys = Object.keys(person);
			keys = keys.filter(o => o.indexOf('card_') == 0 && o.indexOf('_feel') == -1)
			newPerson.cards = []
			for (let indKey = 0; indKey < keys.length; indKey++) {
				
				newPerson.cards[person[keys[indKey]]] = {
					id: `${keys[indKey]}`,
					content: `${keys[indKey]}_${person[keys[indKey] + "_feel"]}`,
					index: `${person[keys[indKey]]}`,
					title: `movingmotivator.play.${keys[indKey]}.title`,
					text: `movingmotivator.play.${keys[indKey]}.text`,
					fell: `${person[keys[indKey] + "_feel"]}`,
				}
							
			}
			listItens.push(newPerson)
		}
		return listItens
	}

	// a little function to help us with reordering the result
	reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	grid = 10;

	getItemStyle = (isDragging, draggableStyle) => ({
		userSelect: 'none',
		padding: this.grid * 1.5,
		margin: `0 ${this.grid}px 0 0`,
		...draggableStyle,
	});

	getListStyle = isDraggingOver => ({
		background: isDraggingOver ? 'lightblue' : 'lightgrey',
		display: 'flex',
		padding: this.grid,
		overflow: 'auto',
	});


	onDragEnd(result) {
		// dropped outside the list
		if (!result.destination) {
			return;
		}

		if (result.destination.droppableId != this.state.user) {
			return;
		}

		const indPerson = this.state.people.findIndex(obj => obj.name == this.state.user);

		let items = this.reorder(
			this.state.people[indPerson].cards,
			result.source.index,
			result.destination.index
		);

		for (let i = 0; i < items.length; i++) {
			let item = items[i];
			item.index = i;
		}

		let people = this.state.people;
		people[indPerson].cards = items;

		this.setState({
			people
		});

		this.update(people[indPerson])
	}

	zoom(index) {
		this.setState({
			modal: index,

		});
	}

	toggle() {
		this.setState({
			modal: undefined,

		});
	}

	felling(val, index, indPerson) {

		let people = this.state.people;
		let card = people[indPerson].cards[index];
		card.fell = val;

		this.setState({
			people
		});

		this.update(people[indPerson])
	}

	update(person) {
		let request = {}

		request.roomid = this.props.history.location.state.request.room.id;
		request.name = person.name;
		for (let i = 0; i < person.cards.length; i++) {
			const card = person.cards[i];
			request[card.id] = i;
			request[card.id + "_feel"] = parseInt(card.fell);
		}
		this.props.updatePlayerMovingMotivators(request);
	}

	remove(name, indPerson) {
		let request = {}

		request.roomid = this.props.history.location.state.request.room.id;
		request.user = name;
		this.props.removePlayerMovingMotivators(request);
	}


	render() {
		return (
			<DefaultLayout className='moving room'>
				<div className='principal'>

					{this.state.people && this.state.people.map((person, indPerson) => (
						<div class="player">
							<div class={person.name != this.state.user ? "block" : ""}></div>
							<div class="name">
								{person.name}
								{this.state.admin == true && person.name != this.state.user ? (<CgTrash className="zoom" onClick={() => this.remove(person.name)} />) : (<></>)}
							</div>
							<div class="instruction">
								<div class="left"><FormattedMessage id="movingmotivator.play.left.title" /></div>
								<div class="right"><FormattedMessage id="movingmotivator.play.right.title" /></div>
							</div>
							<DragDropContext onDragEnd={this.onDragEnd}>
								<Droppable droppableId={person.name} direction="horizontal" >
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											style={this.getListStyle(snapshot.isDraggingOver)}
											{...provided.droppableProps}
										>

											{person.cards.map((item, index) => (
												<Draggable key={item.id} draggableId={item.id} index={item.index}>
													{(provided, snapshot) => (
														<div
															class={"card " + item.id}
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
															style={this.getItemStyle(
																snapshot.isDragging,
																provided.draggableProps.style
															)}
														>
															<div class="title"><FormattedMessage id={item.title} /></div>
															<div class="text"><FormattedMessage id={item.text} /></div>
															<div class="command">
																<CgSmileSad className={item.fell == "-1" ? "sad active" : ""} onClick={() => this.felling(-1, index, indPerson)} />
																<CgSmileNeutral className={item.fell == "0" ? "normal active" : ""} onClick={() => this.felling(0, index, indPerson)} />
																<CgSmile className={item.fell == "1" ? "happy active" : ""} onClick={() => this.felling(1, index, indPerson)} />
																<MdZoomOutMap className="zoom" onClick={() => this.zoom(item.id)} />
															</div>
														</div>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</div>
									)}
								</Droppable>
							</DragDropContext>
						</div>
					))}
					<Modal isOpen={this.state.modal} toggle={this.toggle}>
						<ModalBody className={"card " + this.state.modal}>
							<div class="title"><FormattedMessage id={`movingmotivator.play.${this.state.modal}.title`} /></div>
							<div class="text"><FormattedMessage id={`movingmotivator.play.${this.state.modal}.text`} /></div>
						</ModalBody>
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
			updatePlayerMovingMotivators,
			findMovingMotivatorsByRoom,
			removePlayerMovingMotivators
		},
		dispatch,
	);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovingMotivatorsRoom));
