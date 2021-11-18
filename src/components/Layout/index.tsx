import React from 'react';
import styled from 'styled-components';

const MainLayoutTap = styled.div``;

export type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return <div>{children}</div>;
}

export type MainProps = {
  leftNav?: React.ReactNode;
  centerContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export type ContentProps = {
  children: React.ReactNode;
};

export function FirstContent({ children }: ContentProps) {
  return <aside>{children}</aside>;
}
export function CoenterCntent({ children }: ContentProps) {
  return <main>{children}</main>;
}

export function ThirdContent({ children }: ContentProps) {
  return <aside>{children}</aside>;
}

MainLayout.FirstContent = FirstContent;
MainLayout.CoenterCntent = CoenterCntent;
MainLayout.ThirdContent = ThirdContent;
