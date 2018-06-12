import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import { Answer } from '../App/Section/Answer/Answer';

Enzyme.configure({ adapter: new Adapter() });
const identity = el => el;


const answersDictDummy = {
  0: 'Test',
  1: 'Hi',
  3: 'Hello',
};

describe('Answer', () => {
  let wrapper;

  it('renders snapshot correctly', () => {
    const renderedValue =  renderer.create(
      <Answer
        toggleArrowButtons={identity}
        activeAnswer={{ side: 'left', index: 0 }}
        side="left"
        index={0}
        answersDict={answersDictDummy}
        totalAnswers={5}
        positionAnswer={identity}
        activeQuestion={0}
        setActiveAnswer={identity}
        connectDragSource={identity}
        connectDragPreview={identity}
        isDragging
      />).toJSON();
    expect(renderedValue).toMatchSnapshot();
  });

  it('renders correct text', () => {
      wrapper = shallow(
        <Answer
          toggleArrowButtons={identity}
          activeAnswer={{ side: 'left', index: 0 }}
          side="left"
          index={0}
          answersDict={answersDictDummy}
          totalAnswers={5}
          positionAnswer={identity}
          activeQuestion={0}
          setActiveAnswer={identity}
          connectDragSource={identity}
          connectDragPreview={identity}
          isDragging

        />);
    const renderedText = wrapper.text();
    const expectedText = answersDictDummy[0];
    expect(renderedText).toEqual(expectedText);
  });

  it('arrows-hor-button renders on left side active answer', () => {
    wrapper = shallow(
      <Answer
        toggleArrowButtons={identity}
        activeAnswer={{ side: 'left', index: 0 }}
        side="left"
        index={0}
        answersDict={answersDictDummy}
        totalAnswers={5}
        positionAnswer={identity}
        activeQuestion={0}
        setActiveAnswer={identity}
        connectDragSource={identity}
        connectDragPreview={identity}
        isDragging

      />);
    const buttons = wrapper.find('button');
    expect(buttons.length).toEqual(2);
  });

  it('arrows-hor-button and vert-buttons render on right side active answer', () => {
    wrapper = shallow(
      <Answer
        toggleArrowButtons={identity}
        activeAnswer={{ side: 'right', index: 0 }}
        side="right"
        index={0}
        answersDict={answersDictDummy}
        totalAnswers={5}
        positionAnswer={identity}
        activeQuestion={0}
        setActiveAnswer={identity}
        connectDragSource={identity}
        connectDragPreview={identity}
        isDragging

      />);
    const buttons = wrapper.find('button');
    expect(buttons.length).toEqual(4);
  });

  it('no arrow buttons render on right side not active answer', () => {
    wrapper = shallow(
      <Answer
        toggleArrowButtons={identity}
        activeAnswer={{ side: 'right', index: 0 }}
        side="right"
        index={3}
        answersDict={answersDictDummy}
        totalAnswers={5}
        positionAnswer={identity}
        activeQuestion={0}
        setActiveAnswer={identity}
        connectDragSource={identity}
        connectDragPreview={identity}
        isDragging

      />);
    const buttons = wrapper.find('button');
    expect(buttons.length).toEqual(1);
  });
});
