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

  renderAnswerOptions(options) {
    const optionsInnerHTML = options.map((option) => {
      return (
        <div className="section__options-container__option my-4">
          <div className="section__options-container__option__placeholder"></div>
          <div className="section__options-container__option__answer m-2">
            <p>{option}</p>
          </div>
        </div>
      );
    });

    return (
      <div className="section__options-container">
        {optionsInnerHTML}
      </div>
    );
  }
  render() {
    return (
      <div className="section">
        {this.renderAnswerOptions(this.props.options)}
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
