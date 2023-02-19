import * as React from "react"
import Backdrop from "@mui/material/Backdrop"
import Box from "@mui/material/Box"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Button from "@mui/material/Button"

import WarningAmberIcon from "@mui/icons-material/WarningAmber"

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 448,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

type ModalProps = {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  handleOnDelete: () => void
}
export default function TransitionsModal(props: ModalProps) {
  const { open, handleClose, handleOnDelete } = props

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className="flex flex-col items-center justify-center gap-6">
              <div>
                <WarningAmberIcon className="text-red-700 text-7xl" />
              </div>
              <div className="text-xl font-bold">Are you sure you want to delete this person</div>
              <div className="text-sm">
                This action cannot be undone and all data associated with this person will be
                permanently removed.
              </div>
            </div>
            <div className="mt-10">
              <Button
                onClick={handleOnDelete}
                className="w-full font-bold text-white bg-blue-700 hover:bg-blue-600"
              >
                Yes
              </Button>
              <Button
                onClick={handleClose}
                className="w-full mt-3 font-bold text-black hover:bg-slate-200"
              >
                No
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  )
}
