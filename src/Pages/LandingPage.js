import React from "react";
import styled from "styled-components";
import TabHeader from "../component/tabSection/TabHeader";

export default function LandingPage() {
  return (
    <LandingPageWrapper>
      <TabSection>
        <TabHeader />
      </TabSection>
    </LandingPageWrapper>
  );
}

const LandingPageWrapper = styled.div``;

const TabSection = styled.div`
  width: 80vw;
  margin: auto;
  padding-top: 5vh;
`;
