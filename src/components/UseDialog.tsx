import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type DialogProps = {
    children: React.ReactNode
}

function UseDialog({ children }: DialogProps) {
    return (
        <Dialog
            aria-labelledby="responsive-dialog-title"
            open={true}
            maxWidth="xl"
        >

            <DialogContent style={{ padding: 0 }}>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default UseDialog