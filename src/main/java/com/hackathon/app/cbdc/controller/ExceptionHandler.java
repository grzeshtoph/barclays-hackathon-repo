package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.exception.AccountException;
import com.hackathon.app.cbdc.exception.CampaignCreationException;
import com.hackathon.app.cbdc.exception.LoginException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class ExceptionHandler {

    @ResponseBody
    @org.springframework.web.bind.annotation.ExceptionHandler(LoginException.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String clientExceptionHandler(LoginException ce) {
        return ce.getMessage();
    }

    @ResponseBody
    @org.springframework.web.bind.annotation.ExceptionHandler(AccountException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String accountExceptionHandler(AccountException e) {
        return e.getMessage();
    }

    @ResponseBody
    @org.springframework.web.bind.annotation.ExceptionHandler(CampaignCreationException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public String campaignCreationExceptionHandler(CampaignCreationException e) {
        return e.getMessage();
    }
}
