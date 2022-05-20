import * as React from 'react';
import { useWatch } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import copy from 'copy-to-clipboard';
import { useSnackbar } from 'notistack';

// import dyb from '';

const images = {
  // dyb: require('./images/dyb.JPG'),
  dyb: '/images/dyb.JPG',
  dynb: '/images/dynb.JPG',
  dyh: '/images/dyh.JPG',
  yjh: '/images/yjh.JPG',
};

const labels = {
  dyb: '电泳白',
  dynb: '电泳奶白(+150)',
  dyh: '电泳黄',
  yjh: '阳极黑(+200)',
};

const titles = ['上盖', '底壳', '配重', '铭牌'];

interface IPrevivewProps {
  control: unknown;
}

const Previvew: React.FunctionComponent<IPrevivewProps> = (props) => {
  const { control } = props;
  const { enqueueSnackbar } = useSnackbar();

  const values = useWatch({
    control,
    name: ['top', 'bottom', 'peizhong', 'mingpai'], // without supply name will watch the entire form, or ['values', 'lastName'] to watch both
    // defaultValue: 'default', // default value before the render
  });

  return (
    <Stack spacing={2}>
      <Box
        sx={{
          width: '100%',
          height: 0,
          paddingTop: '60%',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          backgroundImage: `url(${images[values[0]]})`,
          backgroundColor: '#ccc',
          backgroundSize: 'cover',
        }}
      />

      <Typography variant="body1">
        <b>已选择: &nbsp;&nbsp;</b>
        {values
          .map((i, index) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return `${titles[index]}:${labels[i]}`;
          })
          .join('、')}
      </Typography>

      <Typography variant="body1">
        <b>总计: &nbsp;&nbsp;</b>

        {(() => {
          const addPrice = {
            top: {
              dyb: 0,
              dynb: 150,
              dyh: 0,
              yjh: 200,
            },
          };

          let price = 1500;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          price += addPrice.top[values[0]];
          return price;
        })()}
      </Typography>

      <Stack width="200px">
        <Button
          variant="contained"
          color="primary"
          size="large"
          fullWidth={false}
          onClick={() => {
            copy(
              values
                .map((i, index) => {
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  return `${titles[index]}:${labels[i]}`;
                })
                .join('、'),
            );

            enqueueSnackbar('复制成功', {
              variant: 'success',
              autoHideDuration: 3000,
            });
          }}
        >
          复制到剪切板
        </Button>
      </Stack>
    </Stack>
  );
};

export default Previvew;
