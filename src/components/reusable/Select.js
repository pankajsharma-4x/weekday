import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function AnimatedMulti({ options, onChange ,label ,isMulti ,isClearable}) {


  return (
    <Select
      closeMenuOnSelect={false}
      components={animatedComponents}
      isMulti ={isMulti}
      options={options}
      placeholder={label}
      isClearable={isClearable}
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
