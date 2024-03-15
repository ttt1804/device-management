package com.ttt.devicemanagement.exception;

public class PhoneNumberAlreadyExitsException extends RuntimeException{
    public PhoneNumberAlreadyExitsException(String message){
        super(message);
    }
}
