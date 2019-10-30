import React, { Component } from 'react'

export default class ModalContainer extends Component {
  

  Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal.type) {
    case "list":
      component = <ModalCreate type={"list"} />;
      break;
    case "tag":
      component = <ModalCreate type={"tag"} />;
      break;
    case "location":
      component = <ModalCreate type={"location"} />;
      return (
        <div onClick={closeModal}>
          <div onClick={e => e.stopPropagation()}>
            {component}
            <div onClick={closeModal} className="logout-modal-screen" />
          </div>
        </div>
      );
    case "create comment":
      component = <CreateCommenContainer />;
      break;
    case "edit comment":
      component = <EditReviewContainer customProps={modal.currentComment} />;
      break;
    default:
      return null;
  }
}
  render() {
    return (
      <div>
        <div className="modal-background" onClick={closeModal}>
          <div className="modal-child" onClick={e => e.stopPropagation()}>
            {component}
          </div>
        </div>
      </div>
    )
  }
}
