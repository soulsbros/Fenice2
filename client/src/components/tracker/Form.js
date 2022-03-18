import { JsonForms } from '@jsonforms/react';
import React from 'react';
import schema from '../../form/trackerSchema.json';
import uischema from '../../form/trackerUISchema.json';
import { materialCells, materialRenderers } from '@jsonforms/material-renderers';

const Form = ({ handleFormData }) => {
  const playerData = localStorage['playerData']
    ? JSON.parse(localStorage['playerData'])
    : {
        player: true,
      };

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={playerData}
      renderers={materialRenderers}
      cells={materialCells}
      onChange={({ data }) => handleFormData(data)}
    />
  );
};

export default Form;
