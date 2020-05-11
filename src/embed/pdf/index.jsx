import React from 'react';
import PdfCom from './pdfCom'
import './index.less';

function Pdf() {
  
  // window.getSelection();
  // const DEFAULT_URL = "https://arxiv.org/pdf/1708.08021.pdf"
    
  return (
    <div className="PdfBox">
      pdf 渲染页面
      <PdfCom />
    </div>
  );
}

export default Pdf;
