import React, { Component } from 'react'
import { Mutation } from 'react-apollo'
import Mutations from '../../graphql/mutations'
const {CREATE_TAG, CREATE_LIST} = Mutations

export default class CreateModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      input: "", 
      userId: localStorage.getItem("currentuserId"),
      message: ""
    }
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }
  
  handleSubmit(e, newObj) {
    e.preventDefault();
    e.stopPropagation();
      newObj({
        variables: {
          name: this.state.input,
          userid: this.state.userId
        }
      })
  }

  render() {
    
    return (
      <Mutation
        mutation={this.props.type === "list" ? CREATE_LIST :
          CREATE_TAG}
        onError={err => this.setState({ message: err.message })}
        onCompleted={data => {
          let newObj;
          this.state.type === "list" ? newObj = data.newList : newObj = data.newTag
          const { name } = newObj;
          console.log(`${name} created succesfully`)
        }}
      >
        {(newObj, { data }) => (
          <div className="modal-container">
            <form className="modal-form" onSubmit={e => this.handleSubmit(e, newObj)}>
              <input className="modal-input" onChange={this.update("input")} value={this.state.input} />
              <button className="modal-button">{this.props.type === "list" ? <p>Create List</p>:
                <p>Create Tag</p>}</button>
            </form>
          </div>
        )}
      </Mutation>
    )
  }
}
