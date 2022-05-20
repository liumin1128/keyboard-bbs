import React, { useRef } from 'react';
import get from 'lodash/get';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CellTowerIcon from '@mui/icons-material/CellTower';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import {
  useOpenAdsMutation,
  useOperateShopMutation,
  useUpdateShopProxyMutation,
} from '@/generated/graphql';

import Dialog, { DialogRef } from '@/components/Dialog';
import SimpleForm, { FormRefInstance } from '@/components/Form/v3';

import useShop from './useShop';
import { createFormItems, proxyFormItems } from './forms';
import columns from './columns';

const Shop: React.FunctionComponent = () => {
  const dialogRef = useRef<DialogRef>();
  const formRef = useRef<FormRefInstance>();

  const dialogRefProxy = useRef<DialogRef>();
  const formRefProxy = useRef<FormRefInstance>();

  const { data = {}, createShop, updateShop, deleteShop } = useShop();
  const { shops = [] } = data;

  const [openAds] = useOpenAdsMutation();
  const [operateShop] = useOperateShopMutation();
  const [updateShopProxy] = useUpdateShopProxyMutation();

  const handleOpenAds = async () => {
    await openAds();
  };

  const handelOpenCreate = async () => {
    await dialogRef.current?.open();
  };

  const handelOpenUpdate = (values) => async () => {
    await dialogRef.current?.open();
    Object.keys(values).forEach((key) => {
      formRef.current?.form.setValue(key, values[key]);
    });
  };

  const handelDelete = (values) => async () => {
    await deleteShop({ variables: { _id: values._id } });
  };

  const handleSubmit = async (values) => {
    try {
      if (values._id) {
        await updateShop({ variables: values });
      } else {
        await createShop({ variables: values });
      }
      await dialogRef.current?.close();
    } catch (error) {
      console.log(error);
    }
  };

  const handelOpenProxy = (values) => async () => {
    await dialogRefProxy.current?.open();
    Object.keys(values).forEach((key: string) => {
      formRefProxy.current?.form.setValue(key, values[key]);
    });
  };

  const handleProxySubmit = async (values) => {
    console.log('values');
    console.log(values);
    try {
      await updateShopProxy({ variables: values });
      await dialogRefProxy.current?.close();
    } catch (error) {
      console.log('error');
      console.log(error);
    }
  };

  const handelRefreshInbox = (_id: string) => async () => {
    await operateShop({ variables: { _id, action: 'RefreshInbox' } });
  };

  const handelItemAdd = (_id: string) => async () => {
    await operateShop({ variables: { _id, action: 'ItemAdd' } });
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={handleOpenAds}>
          Import shop from ADS
        </Button>
        <Button variant="contained" onClick={handelOpenCreate}>
          Add Shop
        </Button>
      </Stack>

      <Stack
        sx={{
          // border: '1px red solid',
          width: '100%',
        }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell component="th" padding="checkbox">
                <Checkbox color="primary" />
              </TableCell>
              <TableCell component="th" align="left">
                name
              </TableCell>
              <TableCell component="th" align="left">
                Last Message
              </TableCell>
              <TableCell component="th" align="right">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shops.map((i: any) => {
              let lastMsg = '';
              if (i?.currentSession) {
                const currentSession = JSON.parse(i?.currentSession);
                lastMsg = get(
                  currentSession,
                  'msg_thread.messages[0]entity.body',
                );
              }
              return (
                <TableRow
                  key={i._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      // checked={isItemSelected}
                      // inputProps={{
                      //   'aria-labelledby': labelId,
                      // }}
                    />
                  </TableCell>
                  <TableCell component="td" scope="row">
                    {i.name}
                  </TableCell>
                  <TableCell component="td" scope="row" sx={{ maxWidth: 200 }}>
                    {lastMsg}
                  </TableCell>
                  <TableCell component="td" scope="row" align="right">
                    <Button
                      size="small"
                      variant="link"
                      onClick={handelOpenUpdate(i)}
                    >
                      update
                    </Button>
                    <Button
                      size="small"
                      variant="link"
                      onClick={handelOpenProxy({ _id: i?._id, ...i?.proxy })}
                    >
                      proxy
                    </Button>
                    <Button
                      size="small"
                      variant="link"
                      onClick={handelDelete(i)}
                    >
                      delete
                    </Button>
                    <Button
                      size="small"
                      variant="link"
                      onClick={handelRefreshInbox(i?._id)}
                    >
                      Refresh Inbox
                    </Button>
                    <Button
                      size="small"
                      variant="link"
                      onClick={handelItemAdd(i?._id)}
                    >
                      Item Add
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Stack>

      {/* <Stack sx={{ width: '100%', height: '300px' }}>
        <DataGrid
          rows={shops.map((i) => ({
            name: i.name,
            id: i._id,
            currentSession: i.currentSession,
          }))}
          columns={columns}
          checkboxSelection
        />
      </Stack> */}

      <Dialog
        fullWidth
        showHeader
        showFooter
        title="Edit Shop"
        confirmButtonText="Submit"
        ref={dialogRef}
        PaperProps={{ sx: { maxWidth: 500 } }}
        onConfirm={() => {
          formRef.current?.form.handleSubmit(handleSubmit)();
        }}
        renderContent={() => {
          return <SimpleForm ref={formRef} items={createFormItems} />;
        }}
      />

      <Dialog
        fullWidth
        showHeader
        showFooter
        title="Edit Proxy"
        confirmButtonText="Submit"
        ref={dialogRefProxy}
        PaperProps={{ sx: { maxWidth: 500 } }}
        onConfirm={() => {
          formRefProxy.current?.form.handleSubmit(handleProxySubmit)();
        }}
        renderContent={() => {
          return <SimpleForm ref={formRefProxy} items={proxyFormItems} />;
        }}
      />
    </Stack>
  );
};

export default Shop;
