import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import React from 'react'

const DialogBox = ({ title, children, buttonName, onClickFunction, onCloseFunction = null, onCancel, isModalOpen, setIsModalOpen, maxWidth = 'md', cancelButtonName = "Cancel", showActions = true, loading, disableButton = false }) => {
  return (
    <Dialog open={isModalOpen} onClose={onCloseFunction} fullWidth maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <hr />
      <form onSubmit={onClickFunction}>
        <DialogContent sx={{ padding: '0px' }}>
          <div className="w-full md:p-[15px] p-[5px]">
            {children}
          </div>
        </DialogContent>
        <hr />
        <br />
        {
          showActions && <DialogActions>
            <Button onClick={() => { setIsModalOpen(false); onCancel() }} sx={{
              textTransform: "none", backgroundColor: 'red', color: 'white', "&:hover": {
                backgroundColor: '#ff4545',
              }
            }}>{cancelButtonName}</Button>
            <LoadingButton color="primary" variant="contained" type='submit' loading={loading}
              loadingPosition="center" sx={{
                textTransform: "none",
              }} disabled={disableButton}>{buttonName}</LoadingButton>
          </DialogActions>
        }
      </form>
    </Dialog>
  )
}

export default DialogBox