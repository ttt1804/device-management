package com.ttt.devicemanagement.exception;

public class EmailAlreadyExitsException extends RuntimeException{
    public EmailAlreadyExitsException(String message) {
        super(message);
    }
}
