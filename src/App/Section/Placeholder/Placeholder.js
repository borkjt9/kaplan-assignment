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
  data.fromSide = fromSide;
  positionAnswer(data);
}

const placeholderTarget = {

  canDrop(props) {
    return true;
  },

  drop(props) {
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
  },
};


function collect(connect, monitor) {
  const info = {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
  return info;
}

function renderOverlay(color) {
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
    />
  );
}

class Placeholder extends Component {
  render() {
    const {
      connectDropTarget,
      isOver,
      canDrop,
      toIndex,
    } = this.props;

    return connectDropTarget(
      <div className="placeholder-container my-4 d-flex align-items-center">
        <h1 className="placeholder-container__number ml-4">{ toIndex + 1 }</h1>
        <div className="placeholder-container__placeholder" />
        {isOver && canDrop && renderOverlay('#007bff')}
      </div>,
    );
  }
}

Placeholder.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  canDrop: PropTypes.bool.isRequired,
  toIndex: PropTypes.number.isRequired,
  fromIndex: PropTypes.number.isRequired,
  positionAnswer: PropTypes.func.isRequired,
  activeQuestion: PropTypes.objectOf(PropTypes.any).isRequired,
  fromSide: PropTypes.string.isRequired,
  toSide: PropTypes.string.isRequired,
};

export default DropTarget(DRAGGABLE_TYPE_ANSWER, placeholderTarget, collect)(Placeholder);
