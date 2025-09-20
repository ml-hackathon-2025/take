package de.metalevel.take.service;

import de.metalevel.take.dto.LoanDTO;
import de.metalevel.take.dto.UserDTO;
import de.metalevel.take.model.User;
import de.metalevel.take.repository.LoanRepository;
import de.metalevel.take.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final LoanRepository loanRepository;

    public List<UserDTO> getAll() {
        return userRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public UserDTO getOne(Long id) {
        return userRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public UserDTO create(UserDTO dto) {
        User user = new User();
        user.setName(dto.name());
        user.setRole(dto.userRole());
        user.setCreatedAt(Instant.now());
        user.setUpdatedAt(Instant.now());

        user = userRepository.save(user);
        return mapToDTO(user);
    }

    public List<LoanDTO> getLoans(Long userId) {
        return loanRepository.findByUserId(userId).stream()
                .map(loan -> LoanDTO.builder()
                        .id(loan.getId())
                        .deviceId(loan.getDevice().getId())
                        .userId(loan.getUser().getId())
                        .borrowedDate(loan.getBorrowedDate())
                        .dueDate(loan.getDueDate())
                        .returned(loan.isReturned())
                        .build())
                .toList();
    }

    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .userRole(user.getRole())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .devices(user.getDevices())
                .build();
    }
}