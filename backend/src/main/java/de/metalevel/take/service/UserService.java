package de.metalevel.take.service;

import de.metalevel.take.dto.LoanDTO;
import de.metalevel.take.dto.UserDTO;
import de.metalevel.take.model.Loan;
import de.metalevel.take.model.User;
import de.metalevel.take.repository.LoanRepository;
import de.metalevel.take.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

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
        user.setRole(dto.userRole());

        user = userRepository.save(user);
        return mapToDTO(user);
    }

    public List<LoanDTO> getLoans(String userId) {
        return loanRepository.findByUserId(userId).stream()
                .map(stockItem -> LoanDTO.builder()
                        .id(stockItem.getId())
                        .stockItemId(stockItem.getStockItem().getId())
                        .userId(stockItem.getUser().getId())
                        .borrowedDate(stockItem.getBorrowedDate())
                        .dueDate(stockItem.getDueDate())
                        .returned(stockItem.getReturned())
                        .build())
                .toList();
    }

    private UserDTO mapToDTO(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .userRole(user.getRole())
                .devices(user.getLoans()
                        .stream().map(Loan::getStockItem)
                        .collect(Collectors.toSet()))
                .build();
    }
}