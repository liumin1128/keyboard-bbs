import ListItem, { ListItemProps } from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';

// css to jss: ALT + X
const CustomListItem = styled(ListItem)<ListItemProps>(({ theme }) => ({
  borderRadius: '10px',
  position: 'relative',
  marginBottom: '28px',

  '& .MuiListItemText-root span': {
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '22px',
    color: '#616268',
    letterSpacing: 0.5,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 'auto',
    marginRight: 12,
  },

  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    '& .MuiListItemText-root span': {
      color: theme.palette.primary.contrastText,
      fontWeight: 700,
    },
    '&:after': {
      content: '""',
      position: 'absolute',
      left: -16,
      top: 0,
      width: '8px',
      height: '100%',
      borderRadius: 8,
      backgroundColor: theme.palette.primary.main,
    },
    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.contrastText,
    },
  },

  '& .MuiListItemButton-root': {
    borderRadius: 8,
  },
}));

export default CustomListItem;
