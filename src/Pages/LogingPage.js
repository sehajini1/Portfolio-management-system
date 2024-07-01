import React from "react";
import styled from "styled-components";
import LogingForm from '../component/logingSection/LogingForm'

export default function LogingPage() {
    return(
        <LogingFormWrapper>
            <LogingForm/>
        </LogingFormWrapper>
    );
}

const LogingFormWrapper = styled.div`

`