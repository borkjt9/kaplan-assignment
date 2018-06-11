import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { dragPreviewSrc, horArrowSrc, upArrowSrc, downArrowSrc } from '../../../shared/assets/assetURLs';
import { DRAGGABLE_TYPE_ANSWER } from '../../../redux/constants';
import './_Answer.scss';

/**
 * Used as a parameter to DragSource. Which is a higher order component from react-dnd library.
 * http://react-dnd.github.io/react-dnd/docs-overview.html
 */
const answerSource = {
  /**
   * Tells DragSource to begin drag.
   * @param {Object} props - The components props, plus added props from react-dnd.
   */
  beginDrag(props) {
    const {
      id,
      left,
      top,
      side,
      index,
    } = props;

    props.setActiveAnswer({ side, index });
    return { id, left, top };
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
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class Answer extends Component {
  /**
   * Answers are rendered in locations whenever an answer is not.
   * Connected to react-dnd higher order component 'DropTarget'.
   */

  componentDidMount() {
    // Supplies img to be used in drag action.
    const img = new Image();
    img.src = dragPreviewSrc;
    img.style.opacity = 0.5;
    this.props.connectDragPreview(img);
  }

  /**
   * Called when either of the arrow buttons are clicked.
   *
   * @param {Number} toIndex - New location of answer.
   * @param {Number} fromIndex - Old location of answer.
   * @param {String} dir - Either 'hor' or 'vert'. used to set toSide and FromSide.
   */
  callPositionAnswer(toIndex, fromIndex, dir) {
    const { positionAnswer, activeQuestion, side } = this.props;
    const data = {
      toIndex,
      fromIndex,
      activeQuestion,
    };
    if (side === 'left' && dir === 'hor') {
      data.toSide = 'right';
      data.fromSide = 'left';
    } else if (side === 'left' && dir === 'ver') {
      data.toSide = 'left';
      data.fromSide = 'left';
    } else if (side === 'right' && dir === 'hor') {
      data.toSide = 'left';
      data.fromSide = 'right';
    } else {
      data.toSide = 'right';
      data.fromSide = 'right';
    }
    positionAnswer(data);
  }

  /**
   * Called when either of the arrow buttons are clicked.
   *
   * @param {Number} index - Used to disable up and down buttons if at bottom or top of answers.
   */
  renderArrowButtons(index) {
    const { side, totalAnswers } = this.props;
    const btnHorizClassName = `answer__arrow-btn --hor --${side}`;
    const horizBtn = () => (
      <button onClick={() => this.callPositionAnswer(index, index, 'hor')} className={btnHorizClassName}>
        <img
          className="answer__arrow-btn__img"
          alt="move answers to left side or right side"
          src={horArrowSrc}
        />
      </button>
    );
    if (side === 'left') {
      return (
        horizBtn()
      );
    }
    let btnUpClassName = `answer__arrow-btns__arrow-btn --vert --up --${side}`;
    if (index === 0) {
      btnUpClassName += ' --is-disabled';
    }
    const upBtn = () => (
      <button
        onClick={() => this.callPositionAnswer(index - 1, index, 'vert')}
        className={btnUpClassName}
      >
        <img
          className="answer__arrow-btns__arrow-btn__up__img"
          alt="move answers to left side or right side"
          src={upArrowSrc}
        />
      </button>
    );

    let btnDownClassName = `answer__arrow-btns__arrow-btn --vert --down --${side}`;
    if (index === totalAnswers - 1) {
      btnDownClassName += ' --is-disabled';
    }
    const downBtn = () => (
      <button
        onClick={() => this.callPositionAnswer(index + 1, index, 'vert')}
        className={btnDownClassName}
      >
        <img
          className="answer__arrow-btns__arrow-btn__down__img"
          alt="move answers to left side or right side"
          src={downArrowSrc}
        />
      </button>
    );
    return (
      <div>
        {horizBtn()}
        <div className="answer__arrow-btns --vert">
          {upBtn()}
          {downBtn()}
        </div>
      </div>
    );
  }

  render() {
    const {
      connectDragSource,
      isDragging,
      toggleArrowButtons,
      activeAnswer,
      side,
      index,
      answersDict,
    } = this.props;
    let answerBtnClassName = 'answer__answer-btn';
    if (activeAnswer.index === index && activeAnswer.side === side) {
      answerBtnClassName += ' --active';
    }

    //connectDragSource is react-dnd function.
    return connectDragSource(
      <div
        action={this.action}
        className="answer my-4"
      >
        <button onClick={() => toggleArrowButtons(index)} className={isDragging ? `${answerBtnClassName}  --active` : answerBtnClassName}>
          <p className="m-2">{answersDict[index]}</p>
        </button>
        { (activeAnswer.index === index && activeAnswer.side === side) ? this.renderArrowButtons(index) : ''}
      </div>
    );
  }
}

Answer.propTypes = {
  /** Supplied by react-dnd. */
  connectDragSource: PropTypes.func.isRequired,
  /** Supplied by react-dnd. Sets position of hover item. */
  connectDragPreview: PropTypes.func.isRequired,
  /** Supplied by react-dnd. True if drag item is being dragged. */
  isDragging: PropTypes.bool.isRequired,
  /** activates / deactives answer. All makes arrow buttons visible. */
  toggleArrowButtons: PropTypes.func.isRequired,
  /**
   * Current active answer. Supplied to toggleArrowButtons.
   * EXAMPLE: {side: 'left', index: 2}
   */
  activeAnswer: PropTypes.objectOf(PropTypes.string).isRequired,
  /** Side answer is found on. */
  side: PropTypes.string.isRequired,
  /** current index of answer. */
  index: PropTypes.number.isRequired,
  /**
   * Total answers for the question.
   * Used to render total number of answers and placeholders.
   */
  answersDict: PropTypes.objectOf(PropTypes.any).isRequired,
  /**
   * Total answers for the question.
   */
  totalAnswers: PropTypes.number.isRequired,
  /** Changes location of answer in section. */
  positionAnswer: PropTypes.func.isRequired,
  /** Active question number. */
  activeQuestion: PropTypes.number.isRequired,
};

export default DragSource(DRAGGABLE_TYPE_ANSWER, answerSource, collect)(Answer);
