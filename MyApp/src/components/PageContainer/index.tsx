import React, { ReactElement } from 'react';
import { Header } from '../Header';
import { Container, Subtitle, Title } from './style';

interface PageContainerProps {
  children: ReactElement;
  pageTitle: string;
  pageSubtitle: string;
  taskPage?: boolean;
}

const PageContainer = ({
  children,
  pageTitle,
  pageSubtitle,
  taskPage,
}: PageContainerProps) => {
  return (
    <Container>
      {taskPage && <Header />}
      <Title>{pageTitle}</Title>
      <Subtitle>{pageSubtitle}</Subtitle>
      {children}
    </Container>
  );
};

export { PageContainer };
