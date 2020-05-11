import React from 'react';
import './index.less';
import { PDFViewer, PDFLinkService } from "pdfjs-dist/web/pdf_viewer";

const EMPTY_ID = "empty-id";

class PdfHighlighter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ghostHighlight: null,
      isCollapsed: true,
      range: null,
      scrolledToHighlightId: EMPTY_ID
    }
    this.viewer = null;
    this.containerNode = null;
    this.linkService = null;
  }

  componentDidMount() {
    const { pdfDocument } = this.props;

  }


}

export default PdfHighlighter;
