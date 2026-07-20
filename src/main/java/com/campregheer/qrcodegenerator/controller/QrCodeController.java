package com.campregheer.qrcodegenerator.controller;

import com.campregheer.qrcodegenerator.dto.QrCodeGenerateRequest;
import com.campregheer.qrcodegenerator.dto.QrCodeGenerateResponse;
import com.campregheer.qrcodegenerator.service.QrCodeGeneratorService;
import com.google.zxing.WriterException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/qrcode")
@CrossOrigin(origins = "*", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS})
public class QrCodeController {
    private final QrCodeGeneratorService qrCodeGeneratorService;
    public QrCodeController(QrCodeGeneratorService qrCodeGeneratorService){
        this.qrCodeGeneratorService = qrCodeGeneratorService;
    }

    @PostMapping
    public ResponseEntity<QrCodeGenerateResponse> generate(@RequestBody QrCodeGenerateRequest request) throws IOException, WriterException {

        try{
            QrCodeGenerateResponse response = this.qrCodeGeneratorService.generateAndUploadQrCode(request.text());
            return ResponseEntity.ok(response);
        }catch (Exception e){
            System.out.println(e);
            return ResponseEntity.internalServerError().build();

        }
    }
}
