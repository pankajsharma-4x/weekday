import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ options, onChange ,label }) {


  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti
      options={options}
      placeholder={label}
      styles={{
        input: base => ({
          ...base,
          textAlign: 'left'
        }),
      }}
      onChange={onChange} 
    />
  );
}
