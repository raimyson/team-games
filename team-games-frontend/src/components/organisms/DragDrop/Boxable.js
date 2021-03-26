import React from 'react';
import { DragDropContainer } from 'react-drag-drop-container';

/*
    Boxable -- a thing you can drag into a Box
*/

export default class Boxable extends React.Component {
    render() {
      return (
        <div className="boxable_component" style={{display: 'inline-block'}}>
          <DragDropContainer
            targetKey={this.props.targetKey}
            dragData={{label: this.props.label}}
            customDragElement={this.props.customDragElement}
            onDragStart={()=>(console.log('start'))}
            onDrag={()=>(console.log('dragging'))}
            onDragEnd={()=>(console.log('end'))}
            onDrop={(e)=>(console.log(e))}
    
          >
            <div className="outer">
              <div className="item">
                <span className="grabber">&#8759;</span>
                {this.props.label}
              </div>
            </div>
          </DragDropContainer>
        </div>
      );
    }
  }