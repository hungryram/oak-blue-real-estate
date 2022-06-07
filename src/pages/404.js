import { Link } from "gatsby"
import * as React from "react"
import Layout from "../components/global/Layout"
const NotFoundPage = () => {
  return (
    <>
      <Layout>
        <div class="section">
          <div class="container">
              <h1>Page not Found</h1>
              <p>Looks like the page might have been moved or deleted</p>
              <Link to="/">Return Home</Link>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default NotFoundPage
