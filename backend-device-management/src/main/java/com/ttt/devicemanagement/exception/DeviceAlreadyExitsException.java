package com.ttt.devicemanagement.exception;

public class DeviceAlreadyExitsException extends RuntimeException{
    public DeviceAlreadyExitsException(String message) {
        super(message);
    }
}
