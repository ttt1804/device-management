package com.ttt.devicemanagement.service.Impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.*;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import com.ttt.devicemanagement.entity.Device;
import com.ttt.devicemanagement.service.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class FileServiceImpl implements FileService {
    @Value("${aws.bucket.name}")
    private String bucketName;

    @Value("${aws.endpointUrl}")
    private String endpointUrl;

    private final AmazonS3 s3Client;

    public String generateAndUploadQRCode(Device device) throws WriterException, IOException {
        // generate qr
        String qrContent = device.getDeviceCode() + " " + device.getName() + " " + device.getColor() + " " + device.getDeviceType() + " " + device.getPurchaseDate();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        BitMatrix bitMatrix = new QRCodeWriter().encode(qrContent, BarcodeFormat.QR_CODE, 400, 400);
        MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);

        // Upload to amazon s3
        byte[] qrCodeBytes = outputStream.toByteArray();
        String qrCodeName = UUID.randomUUID() + ".png";
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("image/png");
        metadata.setContentLength(qrCodeBytes.length);
        PutObjectRequest request = new PutObjectRequest(bucketName, qrCodeName, new ByteArrayInputStream(qrCodeBytes), metadata).withCannedAcl(CannedAccessControlList.PublicRead);
        s3Client.putObject(request);
        return endpointUrl + "/" + qrCodeName;
    }

    @Override
    public void deleteFile(String qrCode) {
        String fileName = qrCode.substring(qrCode.lastIndexOf("/") + 1);
        s3Client.deleteObject(bucketName, fileName);
    }

    @Override
    public String updateQRCode(Device device) throws IOException, WriterException {
        String qrCode = device.getQrCode();
        String fileName = qrCode.substring(qrCode.lastIndexOf("/") + 1);
        s3Client.deleteObject(bucketName, fileName);
        return generateAndUploadQRCode(device);
    }
}

