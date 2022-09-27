package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.CbdcUser;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cbdc-api")
public class LoginController {

    public CbdcUser login(String email, String password) {
        return null;
    }
}
