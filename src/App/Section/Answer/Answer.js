import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import dragPreview from '../../../shared/assets/drag-preview.png'

import { DRAGGABLE_TYPE_ANSWER } from '../../../redux/constants';
import './_Answer.scss';

const answerSource = {
  beginDrag (props, dnd, element) {
    console.log('props of knight, since these aren\'t in the docs')
    console.log(props, dnd, element)
    const { id, left, top, side, index, activeQuestion } = props
    props.setActiveAnswer({ side, index }, activeQuestion);
    return { id, left, top }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  }
}

class Answer extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
  }

  componentDidMount() {
    const img = new Image();
    img.src = dragPreview;
    img.style.opacity = 0.5;
    this.props.connectDragPreview(img);
  }

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

  renderArrowButtons(index) {
    const { side, totalAnswers } = this.props;
    const btnHorizClassName = `answer__arrow-btn --hor --${side}`;
    const horizBtn = () => {
      return (
        <button onClick={() => this.callPositionAnswer(index, index, 'hor')} className={btnHorizClassName}>
          <img
            className= "answer__arrow-btn__img"
            alt="move answers to left side or right side"
            src={require('../../../shared/assets/horizontal-arrows.svg')}
          />
        </button>
      )
    }
    let btnUpClassName = `answer__arrow-btns__arrow-btn --vert --up --${side}`;
    let btnDownClassName = `answer__arrow-btns__arrow-btn --vert --down --${side}`;
    if (index === 0) {
      btnUpClassName += ' --is-disabled';
    }

    if (index === totalAnswers - 1) {
      btnDownClassName += ' --is-disabled';
    }

    if (side === 'right') {
      const upBtn = () => {
        return (
          <button onClick={() => this.callPositionAnswer(index-1, index, 'vert')} className={btnUpClassName}>
            <img
              className= "answer__arrow-btns__arrow-btn__up__img"
              alt="move answers to left side or right side"
              src={require('../../../shared/assets/up-arrow.svg')}
            />
          </button>
        );
      };
      const downBtn = () => {
        return (
          <button onClick={() => this.callPositionAnswer(index+1, index, 'vert')} className={btnDownClassName}>
            <img
              className= "answer__arrow-btns__arrow-btn__down__img"
              alt="move answers to left side or right side"
              src={require('../../../shared/assets/down-arrow.svg')}
            />
          </button>
        );
      };
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
    return (
      horizBtn()
    );
  }

  render () {
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

    return connectDragSource(

      <div
        action={this.action}
        className="answer my-4">
        <button onClick={() => toggleArrowButtons(index)} className={isDragging ? `${answerBtnClassName}  --active` : answerBtnClassName}>
          <p className="m-2">{answersDict[index]}</p>
        </button>
        { (activeAnswer.index === index && activeAnswer.side === side) ? this.renderArrowButtons(index) : ''}
      </div>
    )
  }
}

export default DragSource(DRAGGABLE_TYPE_ANSWER, answerSource, collect)(Answer)
