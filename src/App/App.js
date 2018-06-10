import React, { Component } from 'react';
import './_App.scss';
import '../shared/styles/_rootStyles.scss';

class App extends Component {
  render() {
    return (
      <div className="app --dimensions-is-screen">
        <div className="container">
          <div className="app__question-box row">
            <div className="app__question-box__header --purple d-flex align-items-center justify-content-center">
              <h1 className="app_question-box__header__text">
                Question 1
              </h1>
            </div>
            <div className="app__question-box__question-container">

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
