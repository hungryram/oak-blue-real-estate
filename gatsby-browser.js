import './src/styles/global.css'
import * as React from 'react'
import Layout from './src/components/global/Layout'
import Seo from './src/components/global/Seo'
import { window } from 'browser-monads'

export const wrapPageElement = ({ element }) => {
    return(
        <Layout>
            <Seo pageUrl={window?.location.href} />
            {element}
        </Layout>
    )
}