import './src/styles/global.css'
import * as React from 'react'
import Layout from './src/components/global/Layout'

export const wrapPageElement = ({ element }) => {
    return(
        <Layout>
            {element}
        </Layout>
    )
}