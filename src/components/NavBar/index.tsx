import React from 'react';
import media from 'src/lib/styles/media';

import styled from 'styled-components';
import useGetUser from './hooks/useGetUser';
import Navbar from './NavBar';

const TopBannerTap = styled.div`
  height: 25rem;
  background: url('https://designmodo.com/wp-content/uploads/2020/06/google-analytics-ux.jpg')
    no-repeat center;

  .layout-wrapper {
    width: 100%;
    height: 25rem;
  }
`;

const BarCenter = styled.div`
  display: inline-block;
  text-align: center;
  padding-top: 4rem;
  margin: 0 auto;
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2), 0 5px 10px rgba(0, 0, 0, 0.2);
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
  ${media.custom(400)} {
    font-size: 3rem;
  }
`;

const BarPost = styled(Barlog)`
  font-size: 20px;
`;

export type HeaderProps = {
  data?: any;
};

export const item = ['login', 'register'];
export const item2 = ['write'];

function Header({ data }: HeaderProps) {
  const { getUser } = useGetUser();

  return (
    <TopBannerTap>
      <div className="layout-wrapper">
        <Navbar items={getUser?.me ? item2 : item} color="#fff" />
        {data ? (
          <BarCenter>
            <Barlog>Dev Posts</Barlog>
            <BarPost>{data?.posts?.length} ARTICLES</BarPost>
          </BarCenter>
        ) : (
          ''
        )}
      </div>
    </TopBannerTap>
  );
}

export default Header;
