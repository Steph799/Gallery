import styled from '@emotion/styled';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

type DialogFields = {
    children: React.ReactNode
    no_padding?: boolean
}

const StyledDialogContent = styled(DialogContent)<{ no_padding: string }>(props => ({
    padding: props.no_padding ? 0 : '4px 4px 0 4px',
    position: 'relative'
}));

const StyledDialog = styled(Dialog)(() => ({
    '& .MuiPaper-root': {
        margin: 5
    },
}));


function UseDialog({ children, no_padding = false }: DialogFields) {
    return (
        <StyledDialog
            aria-labelledby="responsive-dialog-title"
            open={true}
            maxWidth="xl"
        >
            <StyledDialogContent no_padding={no_padding ? no_padding.toString() : ''}>
                {children}
            </StyledDialogContent>
        </StyledDialog>
    )
}

export default UseDialog