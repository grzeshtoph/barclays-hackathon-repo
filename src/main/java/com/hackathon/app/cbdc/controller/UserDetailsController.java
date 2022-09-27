package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.CbdcUserDetails;
import com.hackathon.app.cbdc.service.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cbdc-api")
@RequiredArgsConstructor
public class UserDetailsController {

    private final UsersService usersService;

    @GetMapping("/users/{userId}")
    public CbdcUserDetails getUserDetails(@PathVariable Long userId) {
        return usersService.getUserDetails(userId);
    }
}
