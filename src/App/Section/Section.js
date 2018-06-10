import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_Section.scss';

const Placeholder = () => (
  <div className="placeholder" />
);

class Section extends Component {
  constructor(props) {
    super(props);
  }

  renderPlaceholders(total) {
    const optionsInnerHTML = [...Array(total).keys()].map((option) => (
          <div className="section__placeholder-container__option my-4 d-flex align-items-center">
            <h1 className="section__placeholder-container__option__number ml-4">{option+1}</h1>
            <div className="section__placeholder-container__option__placeholder" />
          </div>
      ));
    return (
      <div className="section__placeholder-container">
        {optionsInnerHTML}
      </div>
    );
  }

  renderAnswers(answers) {
    const answersInnerHTML = answers.map((answer) => {
      return (
        <div className="section__answers-container__answers my-4">
          <button className="section__answers-container__answers__answer">
            <p className="m-2">{answer}</p>
          </button>
        </div>
      );
    });
    return (
      <div className="section__answers-container">
        {answersInnerHTML}
      </div>
    );
  }

  render() {
    return (
      <div className="section">
        {this.renderPlaceholders(5)}
        {this.renderAnswers(this.props.options)}
      </div>
    );
  }
}

Section.defaultProps = {
  options: [],
};

Section.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};

export default Section
