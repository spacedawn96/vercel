import React from 'react';
import styled from 'styled-components';
import heightMedia from '../../lib/styles/height';
import media from '../../lib/styles/media';

const ArticlesTap = styled.div``;

const BarCenter = styled.div`
  ${heightMedia.custom(600)} {
    display: none;
  }
  display: inline-block;
  text-align: center;
  padding-top: 4rem;
  margin: 0 auto;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2);
  ${media.custom(400)} {
    padding-top: 2rem;
  }
`;

const Barlog = styled.div`
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2);
  font-size: 4rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.022em;
  color: #fff;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const BarPost = styled(Barlog)`
  font-size: 20px;
`;

export type ArticlesProps = {
  datas?: number;
};

function Articles(props: ArticlesProps) {
  return (
    <ArticlesTap>
      {props.datas ? (
        <BarCenter>
          <Barlog>Dev Post</Barlog>
          <BarPost>{props.datas} ARTICLES</BarPost>
        </BarCenter>
      ) : (
        ''
      )}
    </ArticlesTap>
  );
}

export default Articles;
