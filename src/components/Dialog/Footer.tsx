import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

interface IFooterProps {
  confirmButtonText?: string;
  onConfirm?: () => void;

  cancelButtonText?: string;
  onCancel?: () => void;

  showCancel?: boolean;
  showConfirm?: boolean;
}

const Footer: React.FunctionComponent<IFooterProps> = (props) => {
  const {
    confirmButtonText,
    onConfirm,
    cancelButtonText,
    onCancel,
    showCancel,
    showConfirm,
  } = props;
  return (
    <Stack
      direction="row"
      sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
      spacing={2}
    >
      {showCancel && (
        <Button size="large" onClick={onCancel}>
          {cancelButtonText}
        </Button>
      )}
      {showConfirm && (
        <Button size="large" variant="contained" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      )}
    </Stack>
  );
};

export default Footer;
