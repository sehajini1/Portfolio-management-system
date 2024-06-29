import React from "react";
import styled from "styled-components";
import TabHeader from "../component/TabHeader";

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
    width: 60vw;
    margin: auto;
    padding-top: 10vh;
`;
