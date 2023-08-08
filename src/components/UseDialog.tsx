import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type DialogProps = {
    children: React.ReactNode
}

const StyledDialogContent = styled(DialogContent)({
    padding: '4px 4px 0 4px',
    position:'relative'
  });

function UseDialog({ children }: DialogProps) {
    return (
        <Dialog
            aria-labelledby="responsive-dialog-title"
            open={true}
            maxWidth="xl"
        >
            <StyledDialogContent >
                {children}
            </StyledDialogContent>
        </Dialog>
    )
}

export default UseDialog