import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DRAGGABLE_TYPE_ANSWER } from '../../../redux/constants';
import './_Placeholder.scss';

function callPositionAnswer(fromIndex, toIndex, positionAnswer, activeQuestion, fromSide, toSide) {
  const data = {
    toIndex,
    fromIndex,
    activeQuestion,
  };
  data.toSide = toSide;
  data.fromSide = fromSide
  console.log('data', data)
  positionAnswer(data);
}

const placeholderTarget = {

  canDrop (props) {
    return true;
  },

  drop (props) {
    // const {movePiece, position: {x, y}} = props
    // movePiece(x, y)
    const {
      fromIndex,
      toIndex,
      positionAnswer,
      activeQuestion,
      fromSide,
      toSide,
    } = props;
    callPositionAnswer(fromIndex, toIndex, positionAnswer, activeQuestion, fromSide, toSide);
  }
}


function collect (connect, monitor) {
  const info = {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }

  return info
}

class Placeholder extends Component {
  renderOverlay (color) {
    return (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          borderRadius: 10,
          height: '100%',
          width: '104%',
          marginLeft: '-2%',
          zIndex: 2,
          backgroundColor: color,
        }}
      >
      </div>
    )
  }

  render () {
    const {
      connectDropTarget,
      isOver,
      canDrop,
      toIndex
    } = this.props;
    const dropStyle = {
      position: 'relative',
      width: '100%',
      height: '100%'
    }



    return connectDropTarget(
        <div  className="placeholder-container my-4 d-flex align-items-center">
          <h1 className="placeholder-container__number ml-4">{ toIndex + 1 }</h1>
          <div className="placeholder-container__placeholder" />
          {isOver && canDrop && this.renderOverlay('#007bff')}
        </div>

    );
  }
}

export default DropTarget(DRAGGABLE_TYPE_ANSWER, placeholderTarget, collect)(Placeholder);
