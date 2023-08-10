import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type DialogProps = {
    children: React.ReactNode
    no_padding?: boolean
}

const StyledDialogContent = styled(DialogContent)<{ no_padding: string }>(props => ({
    padding: props.no_padding ? 0 : '4px 4px 0 4px',
    position: 'relative'
}));

function UseDialog({ children, no_padding = false }: DialogProps) {
    return (
        <Dialog
            aria-labelledby="responsive-dialog-title"
            open={true}
            maxWidth="xl"
        >
            <StyledDialogContent no_padding={no_padding ? no_padding.toString() : ''}>
                {children}
            </StyledDialogContent>
        </Dialog>
    )
}

export default UseDialog