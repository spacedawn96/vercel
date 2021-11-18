import React from 'react';
import styled from 'styled-components';
import Footer from '../Footer';
import Header from '../NavBar';

const MainPageTemplateTap = styled.div``;

export type MainPageTemplateProps = {
  children?: React.ReactNode;
  data: any;
};

function MainPageTemplate({ children, data }: MainPageTemplateProps) {
  return (
    <div>
      <Header data={data} />
      {children}
      <Footer />
    </div>
  );
}

export default MainPageTemplate;
