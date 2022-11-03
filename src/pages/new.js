import * as React from "react"

export default function New() {
    return (
        <>
            <div 
                dangerouslySetInnerHTML={{
                    __html: `{idx_body}`
                }}
            />
        </>
    )
}