import * as React from 'react';
import Box from '@mui/material/Box';

interface ILogoProps {
  src: string;
}

const Logo: React.FunctionComponent<ILogoProps> = ({ src }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <embed
        src={src}
        style={{
          display: 'inline-block',
          width: 90,
        }}
      />
    </Box>
  );
};

export default Logo;
