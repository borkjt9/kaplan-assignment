import React, { Component } from 'react';

import Section from './Section/Section';
import './_App.scss';
import '../shared/styles/_rootStyles.scss';

class App extends Component {
  question = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
  questionOptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  ]


  render() {
    return (
      <div className="app --dimensions-is-screen">
        <div className="container">
          <div className="app__question-box row">
            <div className="app__question-box__header --purple d-flex align-items-center justify-content-center">
              <h1 className="app_question-box__header__question-number">
                Question 1
              </h1>
            </div>
            <div className="app__question-box__question-container p-5">
              <p className="app__question-box__question-container__question-text">
                {this.question}
              </p>
              <div className="app_question-box__question-container__options row">
                <div className="col-5">
                  <Section options={this.questionOptions} />
                </div>
                <div className="col-5">
                  <Section />
                </div>
              </div>
            </div>
          </div>
          <div className="app__btns-container row align-items-center justify-content-between ">
            <button type="button" className="app__btns-container__btn --prev col-2 btn btn-secondary">
              PREV
            </button>
            <button type="button" className="app__btns-container__btn --next col-2 btn btn-primary">
              NEXT
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
