import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
// import style from "./Pdf.module.css";
import pdf from "../PdfPrueba/pdff.pdf";

const PdfComponent = () => {

  useEffect(() => {
    if (isMobile) {
      document.getElementById("pdfDownloadlink").click();
      // window.close();
    }
  }, []);

  return (
    <div>
      {isMobile ? (
        <a href={pdf} id="pdfDownloadlink" download="pdff.pdf">
          Tu dispositivo no puede visualizar este PDF, da clic aqui para
          descargarlo
        </a>
      ) : (
        <div style={{ position: "absolute", width: "100%", height: "100%" }}>
          <embed src={pdf} type="application/pdf" width="100%" height="100%" />
        </div>
      )}
    </div>
  );
};

export default PdfComponent;

//COMPONENTE DE CLASE

// import React, { Component} from "react";

// class Pdf extends Component {
//   if(typeof window !== 'undefined'){
//     document.getElementById('pdfDownaldlink').click();
//     window.close();
//   }
//   render() {
//     return(
//       <div style={{position: 'absolute', width: '100%', height: '100%'}}>
// <object
//   data={require('../Pdf/pdf.pdf')}
//   type="application/pdf"
//   width="100%"
//   height="100%"
//   >

//     <br />
//     <a href={require('../Pdf/pdf.pdf')} id="pdfDownaldlink" download="pdf.pdf">Tu dispositivo no puede visualizar PDF, da clic aqui para descagarlo</a>
// </object>
//       </div>
//     )
//   }
// }
// export default Pdf;

//PRIMER INTENTO

// import React from "react";
// import { Document, Page } from '@react-pdf/renderer';
// import { isMobile } from "react-device-detect";
// import style from './Pdf.module.css';

// const Pdf = ({ pdfUrl }) => {
//   if (isMobile) {
//     return (
//       <a href={pdfUrl} download className={style.pdfLink}>
//         Desacargar PDF
//       </a>
//     );
//   } else {
//     return (
//       <div className={style.pdfContainer}>
//         <Document file={pdfUrl} className={style.pdfViewer}>
//         <h1>upite</h1>
//           <Page pageNumber={1} />
//         </Document>
//       </div>
//     )
//   }
// };

// export default Pdf;
