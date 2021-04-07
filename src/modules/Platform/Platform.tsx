import { Box, Container, Step, StepLabel, Stepper } from '@material-ui/core';
import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../utils/ioc.util';
import FirstStage from './stages/FirstStage/FirstStage';
import SecondStage from './stages/SecondStage/SecondStage';
import ThirdStage from './stages/ThirdStage/ThirdStage';
import { PlatformStore } from './Platform.store';

interface PlatformProps {
  token: string;
}

const Platform = ({ token }: PlatformProps) => {
  const steps = ['Payment', 'Status', 'Complete'];
  const store = useStore(PlatformStore);

  const components = [<FirstStage />, <SecondStage />, <ThirdStage />];

  return (
    <Box m='50px'>
      <Container>
        <Stepper activeStep={store.getActiveStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Container maxWidth='sm'>{components[store.getActiveStep]}</Container>
      </Container>
    </Box>
  );
};

export default observer(Platform);
