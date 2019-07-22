import React, { Component } from 'react'
import App from './App'
import { VTable } from '../VTable'

class AppContainer extends Component<{}, {}> {
    render() {
        return (
            <App>
                <VTable />
            </App>
        )
    }
}

export default AppContainer
