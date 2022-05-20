import OutlinedInput, { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';

// css to jss: ALT + X
const CustomOutlinedInput = styled(OutlinedInput)<OutlinedInputProps>(() => ({
  '& input + fieldset legend': {
    display: 'none',
  },
}));

export default CustomOutlinedInput;
