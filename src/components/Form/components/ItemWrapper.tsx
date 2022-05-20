import React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

interface IItemProps {
  label: string;
  error: boolean;
  disabled: boolean;
  helperText: string;
  children: React.ReactNode;
}

const Item: React.FunctionComponent<IItemProps> = ({
  label,
  error,
  disabled,
  helperText,
  children,
}) => {
  return (
    <Stack spacing={1}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: 16,
          lineHeight: '27px',
          // color: '#0D0A19',
        }}
      >
        {label}
      </Typography>
      <FormControl error={error} disabled={disabled}>
        {children}
        <FormHelperText sx={{ ml: 0 }}>{helperText}</FormHelperText>
      </FormControl>
    </Stack>
  );
};

export default Item;
