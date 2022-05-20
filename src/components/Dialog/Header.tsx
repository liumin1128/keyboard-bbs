import * as React from 'react';
import Stack from '@mui/material/Stack';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseSharp from '@mui/icons-material/CloseSharp';

interface IHeaderProps {
  title?: string;
  onClose: () => void;
}

const Header: React.FunctionComponent<IHeaderProps> = ({ title, onClose }) => {
  return (
    <Stack direction="row" sx={{ alignItems: 'center' }}>
      <DialogTitle
        sx={{
          flex: 1,
          p: 0,
          fontWeight: 'bold',
          fontSize: 22,
          lineHeight: '27px',
          // color: '#0D0A19',
        }}
      >
        {title}
      </DialogTitle>
      <IconButton variant="secondary" onClick={onClose}>
        <CloseSharp color="inherit" />
      </IconButton>
    </Stack>
  );
};

export default Header;
