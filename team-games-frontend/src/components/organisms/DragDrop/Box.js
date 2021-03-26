import React from 'react';
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';
import BoxItem from './BoxItem';

export default class Box extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        items: []
      };
    }
  
    handleDrop = (e) => {
      let items = this.state.items.slice();
      //items.push({label: e.dragData.label, uid: shortid.generate()});
      items.push({label: e.dragData.label, uid: 1});
      this.setState({items: items});
      e.containerElem.style.visibility="hidden";
      console.log("handleDrop BOX: "+this.props.card+ " Player: "+e.dragData.label)
      this.props.onChange(this.props.card);
    };
  
    swap = (fromIndex, toIndex, dragData) => {
      let items = this.state.items.slice();
      //const item = {label: dragData.label, uid: shortid.generate()};
      const item = {label: dragData.label, uid: 1};
      items.splice(toIndex, 0, item);
      this.setState({items: items});
      console.log("swap BOX: "+this.props.card+ " Player: "+dragData.label)
    };
  
    kill = (uid) => {
      let items = this.state.items.slice();
      const index = items.findIndex((item) => {
        return item.uid == uid
      });
      if (index !== -1) {
        items.splice(index, 1);
      }
      this.setState({items: items});
    };
  
    render() {
      /*
          Note the two layers of DropTarget. 
          This enables it to handle dropped items from 
          outside AND items dragged between boxes.
      */
      return (
        <div className="component_box">
            <DropTarget
              onHit={this.handleDrop}
              targetKey={this.props.targetKey}
              dropData={{name: this.props.name}}
            >
              <DropTarget
                onHit={this.handleDrop}
                targetKey="boxItem"
                dropData={{name: this.props.name}}
              >
                <div className="box">
                  {this.state.items.map((item, index) => {
                    return (
                      <BoxItem key={item.uid} uid={item.uid} kill={this.kill} index={index} swap={this.swap}>
                        {item.label}
                      </BoxItem>
                    )
                  })}
                </div>
              </DropTarget>
            </DropTarget>
        </div>
      );
    }
  }