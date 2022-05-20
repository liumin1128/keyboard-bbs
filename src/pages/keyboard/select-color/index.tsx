import React, { useState, useRef, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import SimpleForm, { FormRefInstance } from '@/components/Form/v3';
import { colorFormItems } from './forms';
import Previvew from './components/Preview';

const SelectColor: React.FunctionComponent = () => {
  const formRef = useRef<FormRefInstance>();
  const [watched, setWatched] = useState(false);
  // console.log('formRef');
  // console.log(formRef);

  useEffect(() => {
    formRef.current?.form.watch(); // w
    setWatched(true);
  }, [formRef]);

  // const handleSubmit = (values) => {
  //   console.log('values');
  //   console.log(values);
  // };

  // console.log('render')
  // console.log(sss)
  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <SimpleForm
            defaultValues={{
              top: 'dyb',
              bottom: 'dyb',
              peizhong: 'dyb',
              mingpai: 'dyb',
            }}
            ref={formRef}
            items={colorFormItems}
          />

          {/* <Button
            onClick={() => {
              formRef.current?.form.handleSubmit(handleSubmit)();
            }}
          >
            submit
          </Button> */}
        </Grid>
        <Grid item md={6}>
          {watched && <Previvew control={formRef.current?.form.control} />}
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectColor;
