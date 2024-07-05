import React from "react";
import styled from "styled-components";
import LogingForm from "../component/logingSection/LogingForm";
import backgroundImage from "../images/image.jpg"

export default function LogingPage() {
  return (
    <LogingFormWrapper>
      <LogingForm />
    </LogingFormWrapper>
  );
}

const LogingFormWrapper = styled.div`
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh; 
  display: flex;
  justify-content: center;
  align-items: center;

   &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4); // Adjust the opacity as needed
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;
