import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const CenterContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

interface LayoutProps {}

const Layout: React.SFC<LayoutProps> = props => {
  return (
    <Container>
      <CenterContainer>{props.children}</CenterContainer>
    </Container>
  );
};

export { Layout };
