import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ButtonBase, { ButtonBaseProps } from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import GradientBackground from '../GradientBackground';

// css to jss: ALT + X
const CustomButtonBase = styled(ButtonBase)<ButtonBaseProps>(() => ({
  width: '80px',
  height: '48px',
  borderRadius: '10px',
}));

interface Option {
  label: string;
  value: string;
  backgroundColor: string;
}

interface ISelectColorProps {
  options: Option[];
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  field: unknown;
}

const SelectColor: React.FunctionComponent<ISelectColorProps> = (props) => {
  // console.log('props');
  // console.log(props);
  const { options, field } = props;
  const { value, onChange } = field;
  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap' }}>
      {options.map((i) => {
        const active = i.value === value;
        return (
          <Stack
            key={i.value}
            onClick={() => {
              onChange(i.value);
            }}
            sx={{
              cursor: 'pointer',
              mr: 2,
              mb: 2,
            }}
            spacing={1}
          >
            <GradientBackground focus={active}>
              <CustomButtonBase
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                color={i.backgroundColor}
                sx={{
                  backgroundColor: i.backgroundColor,
                }}
              />
            </GradientBackground>
            <Typography variant="caption">{i.label}</Typography>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default SelectColor;
