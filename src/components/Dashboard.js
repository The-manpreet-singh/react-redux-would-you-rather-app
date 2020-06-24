import React, { Component } from 'react'
import { connect } from 'react-redux'
import {connect} from 'react-redux'

class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>My data</h2>
        <ul>
          {this.props.users.map((id) => (
            <li key={id}>
              <div>user Id: {id}</div>
            </li>
          ) )}
        </ul>
      </div>
    )
  }
}

export default connect()(Dashboard)
