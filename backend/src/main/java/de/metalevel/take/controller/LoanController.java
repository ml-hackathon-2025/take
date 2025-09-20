package de.metalevel.take.controller;

import de.metalevel.take.dto.LoanDTO;
import de.metalevel.take.service.LoanService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/loans")
@AllArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @PostMapping("/borrow")
    public LoanDTO borrow(@RequestParam Long deviceId,
                          @RequestParam Long userId,
                          @RequestParam String dueDate) {
        return loanService.borrow(deviceId, userId, Instant.parse(dueDate));
    }

    @PostMapping("/return")
    public LoanDTO returnDevice(@RequestParam Long deviceId) {
        return loanService.returnDevice(deviceId);
    }

    @GetMapping
    public List<LoanDTO> getLoans(@RequestParam(required = false) String status) {
        return loanService.getLoans(status);
    }
}
