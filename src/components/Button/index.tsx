import React from 'react';

import { Button as EvergreenButton, ButtonProps } from 'evergreen-ui';

function Button(props: ButtonProps) {
  return (
    <EvergreenButton size={props.size} {...props}>
      {props.children}
    </EvergreenButton>
  );
}

export default Button;
