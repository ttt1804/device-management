package com.ttt.devicemanagement.service;

import com.google.zxing.WriterException;
import com.ttt.devicemanagement.entity.Device;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {
    String generateAndUploadQRCode (Device device) throws WriterException, IOException;
    void deleteFile(String qrCode);
    String updateQRCode(Device device) throws IOException, WriterException;
}

