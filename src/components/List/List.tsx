import React from 'react';
import styled from 'styled-components';

const ListTap = styled.div`
  display: flex;
`;

export type ListProps = {
  children?: React.ReactNode;
};

function List({ children }: ListProps) {
  return <ListTap>{children}</ListTap>;
}

export default List;
