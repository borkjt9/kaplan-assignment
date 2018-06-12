/**
 * @file Placeholder
 * @author John Borkowski
 * @version 0.1
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { DRAGGABLE_TYPE_ANSWER } from '../../../redux/constants';
import './_Placeholder.scss';

/**
 * Called in drop below after an answer is 'dropped' in the placeholder.
 *
 * @param {function} positionAnswer - Function fed from App component. Connects to redux store.
 * @param {Object} positionData - Object used to position element. Contains the below keys:
 * @key {Number} fromIndex - Old location of answer.
 * @key {Number} toIndex - New location of answer.
 * @key {Number} activeQuestion - Index of active question.
 * @key {Number} fromSide - Old side. Either 'left' or 'right'.
 * @key {Number} toSide - New side. Either 'left' or right'.
 */
function callPositionAnswer(positionAnswer, positionData) {
  positionAnswer(positionData);
}

/**
 * Used as a parameter to DropTarget. Which is a higher order component from react-dnd library.
 * http://react-dnd.github.io/react-dnd/docs-overview.html
 */
const placeholderTarget = {
  /**
   * Returns true because all placeholders are targets
   * @param {Object} props - The components props, plus added props from react-dnd.
   */
  canDrop() {
    return true;
  },

  /**
   * Is called when a component is 'dropped'.
   */
  drop(props) {
    const {
      fromIndex,
      toIndex,
      activeQuestion,
      fromSide,
      toSide,
      positionAnswer,
    } = props;

    const positionData = {
      toIndex,
      fromIndex,
      activeQuestion,
      toSide,
      fromSide,
    };
    callPositionAnswer(positionAnswer, positionData);
  },
};

/**
 * From react-dnd documentation:
 * For each component that needs to track the drag and drop state,
 * You can define a collecting function that retrieves the relevant bits of it from the monitors.
 * React DnD then takes care of timely calling your collecting function
 * and merging its return value into your components' props.
 */
function collect(connect, monitor) {
  const info = {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
  return info;
}

/**
 * Renders overlay on top of placeholder if dragged answer is hovering over it.
 *
 * @param {String} color Color of the overlay.
 */
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

export class Placeholder extends Component {
  /**
   * Placeholders are rendered in locations whenever an answer is not.
   * Connected to react-dnd higher order component 'DropTarget'.
   */
  render() {
    const {
      connectDropTarget,
      isOver,
      canDrop,
      toIndex,
    } = this.props;

    //connectDropTarget is react-dnd function.
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
  /** Supplied by react-dnd. */
  connectDropTarget: PropTypes.func.isRequired,
  /** Supplied by react-dnd. True if drag item is hovering over placeholder */
  isOver: PropTypes.bool.isRequired,
  /** Supplied by react-dnd. True for all Placeholders */
  canDrop: PropTypes.bool.isRequired,
  /** Index of placeholder. Used if answer is 'dropped'. */
  toIndex: PropTypes.number.isRequired,
  /** Old answer index. Used if answer is 'dropped'. */
  fromIndex: PropTypes.number.isRequired,
  /** Changes position of answer to current placeholder position. Fed up to App component. */
  positionAnswer: PropTypes.func.isRequired,
  /** Active question number. Used if answer is 'dropped'. */
  activeQuestion: PropTypes.number.isRequired,
  /** side of old answer. Used if answer is 'dropped'. */
  fromSide: PropTypes.string.isRequired,
  /** side of placeholder. Used if answer is 'dropped'. */
  toSide: PropTypes.string.isRequired,
};

export default DropTarget(DRAGGABLE_TYPE_ANSWER, placeholderTarget, collect)(Placeholder);
