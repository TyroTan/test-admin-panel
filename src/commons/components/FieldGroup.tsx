import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

/* eslint-disable-next-line react/prop-types */
const FieldGroup = ({
  id,
  label,
  help = '',
  ...props
}: {
  [x: string]: any;
}): JSX.Element => {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
};

export default FieldGroup;
