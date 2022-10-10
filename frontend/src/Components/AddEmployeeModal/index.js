import React, { useState, useEffect } from "react";

import Modal from "react-bootstrap/Modal";

export const AddEmployeeModal = (props) => {
  const { show, onHide } = props;

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    ></Modal>
  );
};
