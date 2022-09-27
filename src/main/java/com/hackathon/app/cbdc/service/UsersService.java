package com.hackathon.app.cbdc.service;

import com.hackathon.app.cbdc.exception.NotFoundException;
import com.hackathon.app.cbdc.model.CbdcUserDetails;
import com.hackathon.app.repository.CBDCUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UsersService {

    private final CBDCUserRepository cbdcUserRepository;
    private final AccountsService accountsService;

    public CbdcUserDetails getUserDetails(Long userId) {
        return cbdcUserRepository
            .findById(userId)
            .map(cbdcUser ->
                CbdcUserDetails
                    .builder()
                    .id(cbdcUser.getId())
                    .fullName(cbdcUser.getFirstName() + " " + cbdcUser.getLastName())
                    .accounts(accountsService.getAccounts(userId))
                    .build()
            )
            .orElseThrow(() -> new NotFoundException("User not found"));
    }
}
