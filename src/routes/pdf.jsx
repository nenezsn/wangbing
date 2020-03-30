import React from 'react';
import { Document, Page } from 'react-pdf';
export default class Test extends React.Component {
    state = {
        numPages: null,
        pageNumber: 1,
    }

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    }
    render() {
        const { pageNumber, numPages } = this.state;
        return <div>
            <Document
                file='https://pbu-public.oss-cn-beijing.aliyuncs.com/%E9%97%AE%E9%A2%98.pdf'
                onLoadSuccess={this.onDocumentLoadSuccess}
            >
                <Page pageNumber={pageNumber} />
            </Document>
            <p>Page {pageNumber} of {numPages}</p>
        </div>
    }
}