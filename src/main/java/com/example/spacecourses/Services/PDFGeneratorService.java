package com.example.spacecourses.Services;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Service
public class PDFGeneratorService {

    public void export(HttpServletResponse response,String p1 ,String p2,String qrcode) throws IOException, DocumentException {
        Document document = new Document(PageSize.A4);
        PdfWriter.getInstance(document, response.getOutputStream());

        document.open();
        Font fontTitle = FontFactory.getFont(FontFactory.HELVETICA_BOLD);
        fontTitle.setSize(18);

        Paragraph paragraph = new Paragraph(p1, fontTitle);
        paragraph.setAlignment(Paragraph.ALIGN_CENTER);

        Font fontParagraph = FontFactory.getFont(FontFactory.HELVETICA);
        fontParagraph.setSize(12);

    //   Image img = Image.getInstance("./src/main/resources/static/img/QRCode.png");
       // img.scalePercent(50, 50);
        //img.setAlignment(Element.ALIGN_RIGHT);


        Paragraph paragraph2 = new Paragraph(p2, fontParagraph);
        paragraph2.setAlignment(Paragraph.ALIGN_LEFT);

        document.add(paragraph);
      //  document.add(img);
        document.add(paragraph2);
        document.close();
    }
}
