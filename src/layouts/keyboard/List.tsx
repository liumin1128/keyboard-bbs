import List, { ListProps } from '@mui/material/List';
import { styled } from '@mui/material/styles';

// css to jss: ALT + X
const CustomList = styled(List)<ListProps>(() => ({
  padding: '12px',
}));

export default CustomList;
