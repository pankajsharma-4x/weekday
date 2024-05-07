import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import { colourOptions } from '../data';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'a1', label: 'Bubblegum ' },
    { value: 'a2', label: 'Strawberryyyy' },
    { value: 'a3', label: 'ButterScotch' },
];

const animatedComponents = makeAnimated();

export default function AnimatedMulti() {
  return (
    <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        // defaultValue={[options[4], options[5]]}
        isMulti
        options={options}
        placeholder="Roles"
        styles={{
          input: base => ({
            ...base,
            textAlign: 'left'
          }),
        }}
      />
  );
}