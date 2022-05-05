import * as React from "react"
import Layout from "../components/global/Layout"

const IndexPage = () => {
  return (
    <>
      <Layout>
        <div className="container mx-auto">
          <div className="grid grid-cols-4">
            <div className="bg-red-200 rounded-md p-4 border-2 border-red-500">
                <h2 className="title-font">First Box</h2>
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default IndexPage
