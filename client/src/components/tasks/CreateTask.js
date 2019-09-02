import React from 'react';
import { Mutation } from 'react-apollo'
import Mutations from '../../graphql/mutations'

const { CREATE_TASK } = Mutations 

class CreateTask extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    }
  }

  render() {
    <Mutation
      mutation={CREATE_TASK}>

    </Mutation>
  }
}