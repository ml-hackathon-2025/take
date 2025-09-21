package de.metalevel.take.controller;

import de.metalevel.take.dto.LoanDTO;
import de.metalevel.take.dto.UserDTO;
import de.metalevel.take.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public List<UserDTO> getAll() {
        return userService.getAll();
    }

    @GetMapping("/{username}")
    public UserDTO getOne(@PathVariable String username) {
        return userService.getOne(username);
    }

    @GetMapping("/{id}/loans")
    public List<LoanDTO> getLoans(@PathVariable String id) {
        return userService.getLoans(id);
    }
}