package com.hackathon.app.cbdc.controller;

import com.hackathon.app.cbdc.model.PipDetails;
import com.hackathon.app.cbdc.service.PipService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/cbdc-api")
public class PipController {

    private final PipService pipService;

    @GetMapping("/pips/{userId}")
    public List<PipDetails> pips(@PathVariable Long userId) {
        return pipService.getPipsByUser(userId);
    }
}
