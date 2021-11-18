import React from 'react';
import media from 'src/lib/styles/media';
import styled from 'styled-components';
import heightMedia from '../../lib/styles/height';

const CardTap = styled.div`
  background: #fff;
  padding: 50px 20px;
  box-shadow: 0px 20px 40px rgba(10, 33, 65, 0.05), 0px 0px 2px rgba(0, 0, 0, 0.13);
  border-radius: 6px;
  max-width: 25rem;
  margin: 0 auto;
  height: auto;
  background: ${props => props.color};
  margin-top: 4rem;
`;
const Title = styled.div`
  font-size: 21px;
  text-align: center;
  margin-bottom: 15px;
  color: #262626;
  font-weight: bold;
  font-weight: 600;
  margin-bottom: 4rem;
`;

export type CardProps = {
  body?: React.ReactNode;
  title?: string;
};

function Card(props: CardProps) {
  return (
    <CardTap>
      <Title>{props.title}</Title>
      {props.body && <div>{props.body}</div>}
    </CardTap>
  );
}

export default Card;
