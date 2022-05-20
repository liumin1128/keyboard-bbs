import * as React from 'react';
import { useWatch } from 'react-hook-form';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

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

interface IPrevivewProps {
  control: unknown;
}

const Previvew: React.FunctionComponent<IPrevivewProps> = (props) => {
  const { control } = props;
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
          .map((i) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            return labels[i];
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
    </Stack>
  );
};

export default Previvew;
