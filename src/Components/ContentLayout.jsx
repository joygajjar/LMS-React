import React from "react";
import styled from "styled-components";
import { ContentLayout } from "./ContentPlayer";
import { ContentSidebar } from "./ContentSidebar";

// Main Layout Container
const MainLayoutContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

// Main Layout Component
export const LMSContentLayout = () => {
  return (
    <MainLayoutContainer>
      <ContentSidebar />
      <ContentLayout />
    </MainLayoutContainer>
  );
};
