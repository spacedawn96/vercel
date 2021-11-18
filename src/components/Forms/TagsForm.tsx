import React, { useState } from 'react';
import styled from 'styled-components';

export type TagsFormProps = {
  addTag: (e: string) => void;
};

function TagsForm(props: TagsFormProps) {
  const [value, setValue] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    props.addTag(value);
    setValue('');
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter after Writing tag"
        />
      </form>
    </>
  );
}

export default TagsForm;
