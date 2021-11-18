import React from 'react';
import styled from 'styled-components';
import { List, ListItem } from '../List';
import Link from 'next/link';
import media from '../../lib/styles/media';
import Image from 'next/image';
import useGetUser from './hooks/useGetUser';

export const NavLogo = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  line-height: 5;
  align-items: center;
  transition: background 0.25s;

  font-family: 'Inter', -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
    sans-serif;
  ${media.custom(400)} {
    display: flex;
    flex-wrap: wrap;
    line-height: 1.5;
  }

  img {
    display: flex;
    align-items: center;
  }

  &: hover {
    background: #fff;
    -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.46);
    -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.46);
    box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.46);
    transition: box-shadow 0.35s, transform 0.35s cubic-bezier(0.5, 0, 0.35, 1),
      opacity 0.35s cubic-bezier(0.5, 0, 0.35, 1), background 0.35s;
  }
  .list-wrapper {
    display: flex;
  }
`;

const LogoutButton = styled.div`
  font-size: 1.2rem;
  padding: 0 15px;
  font-weight: 600;
  transition: color 0.25s;
  cursor: pointer;
  color: #fff;
  ${NavLogo}:hover & {
    color: black;
  }
`;

const Img = styled.a`
  .logo {
    display: flex;
    align-items: center;
  }
`;

export type NavBarItemProps = {
  list: any;
  color: any;
};

export type NavbarProps = {
  items: string[];
  color?: string;
};

function Navbar({ items, color }: NavbarProps) {
  const { getUser, loading, error, logoutButton } = useGetUser();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <NavLogo>
      <Link href="/" passHref>
        <Img>
          <div className="logo">
            <Image src="/logo.png" alt="logo" width={200} height={70} />
          </div>
        </Img>
      </Link>
      <div className="list-wrapper">
        <List>
          {items.map(list => (
            <Link href={`/${list}`} key={list} passHref>
              <ListItem items={list} color={color} />
            </Link>
          ))}
          {!loading && getUser?.me ? (
            <LogoutButton onClick={logoutButton}>logout</LogoutButton>
          ) : (
            ''
          )}
        </List>
      </div>
    </NavLogo>
  );
}

export default Navbar;
