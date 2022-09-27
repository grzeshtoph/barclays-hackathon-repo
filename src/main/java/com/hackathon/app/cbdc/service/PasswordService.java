package com.hackathon.app.cbdc.service;

import com.hackathon.app.repository.CBDCUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class PasswordService {

    private final PasswordEncoder passwordEncoder;
    private final CBDCUserRepository cbdcUserRepository;

    public String encode(String password) throws Exception {
        return passwordEncoder.encode(password);
    }

    public boolean matches(CharSequence password, String encodedPassword) {
        return passwordEncoder.matches(password, encodedPassword);
    }

    public String getEncodedPassword(String email) {
        return cbdcUserRepository.findCBDCUserByEmail(email).getPassword();
    }
}
