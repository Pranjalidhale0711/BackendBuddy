
import React from 'react'
import ModalFunc from './Modal'

function Error(props) {
  return (
    <ModalFunc title={props?.title} body = {props?.body} show={props?.show} handleClose={props?.handleClose}  />
  )
}

export default Error