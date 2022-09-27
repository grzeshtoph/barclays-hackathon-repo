package com.hackathon.app.cbdc.service;

import com.hackathon.app.cbdc.exception.LoginException;
import com.hackathon.app.cbdc.model.CbdcUser;
import com.hackathon.app.repository.CBDCUserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class LoginService {

    private final CBDCUserRepository cbdcUserRepository;
    private final PasswordService passwordService;

    public CbdcUser login(String email, String password) {
        return cbdcUserRepository
            .findCBDCUserByEmail(email)
            .filter(user -> passwordService.matches(password, user.getPassword()))
            .map(user -> {
                log.info("Found user: {}", user);
                return CbdcUser.builder().id(user.getId()).build();
            })
            .orElseThrow(() -> new LoginException("Auth error"));
    }
}
