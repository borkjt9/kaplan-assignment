import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

import { Placeholder } from '../App/Section/Placeholder/Placeholder';

Enzyme.configure({ adapter: new Adapter() });


const identity = el => el;


describe('Placeholder', () => {
  let wrapper;

  it('renders snapshot correctly', () => {
    const renderedValue =  renderer.create(
      <Placeholder
        fromIndex={0}
        toIndex={0}
        fromSide="left"
        toSide="right"
        activeQuestion={0}
        positionAnswer={identity}
        connectDropTarget={identity}
        isOver
        canDrop
      />).toJSON()
    expect(renderedValue).toMatchSnapshot();
  });

  it('renders all placeholder text correctly', () => {
    const indexArr = [0, 1, 2, 3, 4];
    indexArr.forEach((index) => {
      wrapper = shallow(
        <Placeholder
          fromIndex={0}
          toIndex={index}
          fromSide="left"
          toSide="right"
          activeQuestion={0}
          positionAnswer={identity}
          connectDropTarget={identity}
          isOver
          canDrop
        />
      );
      const renderedText = wrapper.text();
      const expectedText = (index + 1).toString();
      expect(renderedText).toEqual(expectedText);
    });
  });
});
