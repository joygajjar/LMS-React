import React from "react";
import styled, { css } from "styled-components";
import { FaHome } from "react-icons/fa";
// Main container for the content layout
export const ContentContainer = styled.div`
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100vh; /* Full viewport height */
  width: calc(100vw - 450px); /* Full viewport width minus Sidebar width */
  overflow: auto; /* Prevent horizontal scrolling */
  margin-left: 450px; /* Width of the Sidebar */
`;

// Top Navigation
export const TopNavigation = styled.div`
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  height: 60px; /* Fixed height */
  background-color: #ebebeb;
  display: flex;
  align-items: center;
  padding: 0 10px;
  width: 100%; /* Full width */
  position: fixed;
  left: 450px;
  width: calc(100vw - 450px);
  top: 0px;
  z-index: 1000;
`;

// Bottom Navigation
export const BottomNavigation = styled.div`
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px; /* Height of the bottom navigation */
  background-color: #f1f0f0;
  border-top: 2px solid #b7b7b7;
  padding: 0.5em;
  position: fixed; /* Fixed at the bottom */
  bottom: 0;
  width: calc(100% - 450px); /* Full width minus Sidebar width */
  left: 450px; /* Width of the Sidebar */
  z-index: 10; /* Ensure it is above other content */
`;

// Content Area (to be used between TopNavigation and BottomNavigation)
export const ContentArea = styled.main`
  flex: 1; /* Takes up remaining space */
  display: flex;
  flex-direction: column;
  width: 100%; /* Full width */
  margin-top: 100px; /* Height of the TopNavigation */
  margin-bottom: 100px; /* Height of the BottomNavigation */
 overflow-y: scroll /* Enable vertical scrolling */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  padding: 0px 0px;
  margin-right: 0px;
`;

// Course Panel Container
export const CoursePanelContainer = styled.section`
  flex: 1; /* Takes up remaining space */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%; /* Full width */
  padding: 0; /* Remove padding to ensure full width */
  box-sizing: border-box;
  position: relative; /* For positioning the Play button */
  background: white;
`;

// Video Wrapper
export const VideoWrapper = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
`;

// Styled iframe to take full height and width of its container
export const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
`;

export const Button = styled.button`
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  background-color: #007bff;
  color: #fff;
  border: 1px solid #007bff;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  position: absolute;
  bottom: 10px;
  left: 99%;
  transform: translateX(-99%);
  z-index: 20;

  ${({ customStyles }) =>
    customStyles &&
    css`
      ${customStyles}
    `}
`;
export const NavigationIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px; /* Adjust icon size */
`;
export const NavigationText = styled.div`
  font-size: 18px; /* Adjust text size */
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center; /* Centers the text itself */
`;
export const ContentLayout = () => {
  return (
    <ContentContainer>
      <TopNavigation>
        {/* Top Navigation Content */}
        <NavigationIcon>
          <FaHome /> {/* Replace with your preferred icon */}
          <NavigationText>HTTP and Authentication</NavigationText>
          <div style={{ width: "24px" }} />
        </NavigationIcon>
      </TopNavigation>

      <ContentArea>
        <CoursePanelContainer>
          <VideoWrapper>
            <StyledIframe
              src="https://www.youtube.com/embed/2WdF5aItFvc"
              allowFullScreen
            />
          </VideoWrapper>
        </CoursePanelContainer>
      </ContentArea>

      <BottomNavigation>
        {/* Bottom Navigation Content */}
        <Button
          customStyles={css`
            // background-color: #dc3545;
            // border-color: #dc3545;
            // left: 95%;
          `}
        >
          Next
        </Button>
      </BottomNavigation>
    </ContentContainer>
  );
};
