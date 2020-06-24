import React, { Component } from 'react'
import { connect } from 'react-redux'

class Question extends Component {
  render() {
    return (
      <div>
        <h5>id: {Question.id}</h5>
        <h5>author: {Question.author}</h5>
        <h5>time: {Question.timestamp}</h5>
        <h5>OptionOne: {Question.optionOne.text}</h5>
        <h5>OptionTwo: {Question.optionTwo.text}</h5>
      </div>
    )
  }
}

const mapStateToprops = ({authedUser, users, questions, id}) => {
  const question = questions[id]
  return {
    authedUser,
    question
  }
}

export default connect(mapStateToprops)(Question)
