import React from 'react';
import styled from 'styled-components';
import MainLayout from '../components/Layout';
import PostCard from '../components/PostCard/PostCard';
import MainPageTemplate from '../components/Template';
import { initializeApollo } from '../lib/apollo';
import media from 'src/lib/styles/media';
import { GET_Posts } from 'src/lib/graphql/posts';
import useGetPosts from 'src/hooks/useGetPosts';

const TopBackground = styled.div`
  background: #f7f9fd;
  display: flex;
  flex-wrap: wrap;
  ${media.custom(1900)} {
    height: auto;
  }
`;

const Title = styled.div`
  font-size: 1.8rem;
  letter-spacing: -0.02em;
  width: 90%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  font-weight: bold;
  margin: 0 auto;
  margin-top: 3rem;
  margin-bottom: 3rem;
  color: #262626;
`;

export type MainProps = {
  post: any;
};

export type MainTitleProps = {
  mainTitle: string;
};

export function MainTitle({ mainTitle }: MainTitleProps) {
  return <Title>{mainTitle}</Title>;
}

export default function Home({}: MainProps) {
  const { loading, error, data: post } = useGetPosts();
  const TopPosts = post?.posts?.slice(0, 5);

  return (
    <>
      <MainPageTemplate data={post}>
        <MainLayout.FirstContent>
          <TopBackground>
            <MainTitle mainTitle="Most Popular Articles" />
            <PostCard data={TopPosts} isSmall={false} />
          </TopBackground>
        </MainLayout.FirstContent>
        <MainLayout.CoenterCntent>
          <MainTitle mainTitle="Latest Articles" />
          <PostCard data={post?.posts} isSmall={false} />
        </MainLayout.CoenterCntent>
      </MainPageTemplate>
    </>
  );
}
