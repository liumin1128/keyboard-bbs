import {
  useState,
  useImperativeHandle,
  forwardRef,
  ElementType,
  ReactNode,
  ForwardedRef,
} from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import isEmpty from 'lodash/isEmpty';
import Header from './Header';
import Footer from './Footer';

interface Props extends Omit<DialogProps, 'open'> {
  component?: ElementType;
  renderContent?: (props?: Record<string, unknown>) => ReactNode;
  renderFooter?: (props?: Record<string, unknown>) => ReactNode;
  renderHeader?: (props?: Record<string, unknown>) => ReactNode;
  children?: ReactNode;
  title?: string;
  showHeader?: boolean;
  showFooter?: boolean;

  showCancel?: boolean;
  showConfirm?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export type DialogRef = {
  open: (args?: Record<string, unknown>) => void;
  close: () => void;
};

const MyDialog = forwardRef((props: Props, ref: ForwardedRef<unknown>) => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});

  function handleClose() {
    setVisible(false);
  }

  function handleOpen(args?: Record<string, unknown>) {
    setVisible(true);
    if (!isEmpty(args)) {
      setData(args);
    }
  }

  useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }));

  const {
    component: Component,
    renderContent,
    renderFooter,
    renderHeader,
    children,
    title,
    showHeader,
    showFooter,

    showCancel = false,
    showConfirm = true,
    onConfirm,
    onCancel,
    confirmButtonText = 'Confirm',
    cancelButtonText = 'Cancel',
    ...other
  } = props;

  return (
    <Dialog
      open={visible}
      onClose={() => {
        handleClose();
      }}
      {...other}
    >
      <Stack sx={{ px: 4, py: 5 }} spacing={3}>
        {showHeader && (
          <Header
            title={title}
            onClose={() => {
              handleClose();
            }}
          />
        )}

        {renderHeader && renderHeader(data)}

        {children && children}
        {Component && <Component {...data} />}
        {renderContent && renderContent(data)}

        {renderFooter && renderFooter(data)}

        {showFooter && (
          <Footer
            showCancel={showCancel}
            showConfirm={showConfirm}
            confirmButtonText={confirmButtonText || 'Confirm'}
            cancelButtonText={cancelButtonText || 'Cancel'}
            onConfirm={() => {
              if (typeof onConfirm === 'function') {
                onConfirm();
              }
            }}
            onCancel={() => {
              handleClose();
              if (typeof onCancel === 'function') {
                onCancel();
              }
            }}
          />
        )}
      </Stack>
    </Dialog>
  );
});

export default MyDialog;
