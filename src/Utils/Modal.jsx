import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    borderRadius : '4%',
    boxShadow: 22,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"column",
    p: 4,
};

function ModalFunc(props) {
    return (
        <Modal
            open={props?.show}
            onClose={props?.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"

        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    <ErrorIcon color='red' />
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {props?.body}
                </Typography>
            </Box>
        </Modal>
    )
}

export default ModalFunc