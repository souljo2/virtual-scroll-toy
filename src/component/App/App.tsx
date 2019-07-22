import React from 'react'
import styled from 'styled-components'

interface AppFCProps {}

const App: React.FC<AppFCProps> = ({ ...props }) => {
    return (
        <AppWrapper>
            <AppTitle>Virtual Scroll을 해봅시다.</AppTitle>
            <AppVTableWrapper>{props.children}</AppVTableWrapper>
        </AppWrapper>
    )
}

const AppWrapper = styled.section`
    && {
        background: #999;
        width: 100vw;
        height: 100vh;
        padding: 24px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
`

const AppTitle = styled.div`
    && {
        font-size: 2rem;
        font-weight: bold;
        padding-bottom: 24px;
    }
`

const AppVTableWrapper = styled.div`
    && {
        width: 80%;
        height: 60%;
        border: 1px solid #666;
        padding: 12px;
        background: #fff;
        border-radius: 4px;
    }
`

export default App
