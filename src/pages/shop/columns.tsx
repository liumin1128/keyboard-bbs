import { GridColDef } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { field: 'name', headerName: 'Name', width: 90 },
  { field: 'currentSession', headerName: 'CurrentSession', width: 90 },
];

export default columns;
