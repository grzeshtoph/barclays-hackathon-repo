package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.CbdcLoginInput;
import com.hackathon.app.cbdc.model.CbdcUser;
import com.hackathon.app.cbdc.service.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cbdc-api")
public class LoginController {

    private final LoginService loginService;

    @PostMapping("/login")
    public CbdcUser login(@RequestBody CbdcLoginInput cbdcLoginInput) {
        return loginService.login(cbdcLoginInput.getEmail(), cbdcLoginInput.getPassword());
    }
}
