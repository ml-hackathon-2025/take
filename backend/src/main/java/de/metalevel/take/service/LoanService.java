package de.metalevel.take.service;

import de.metalevel.take.dto.LoanDTO;
import de.metalevel.take.model.Loan;
import de.metalevel.take.model.StockItem;
import de.metalevel.take.model.User;
import de.metalevel.take.repository.LoanRepository;
import de.metalevel.take.repository.StockItemRepository;
import de.metalevel.take.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class LoanService {

    private final LoanRepository loanRepository;
    private final StockItemRepository stockItemRepository;
    private final UserRepository userRepository;

    public LoanDTO borrow(Long deviceId, Long userId, Instant dueDate) {
        // First, retrieve the stockItem or throw if not found
        StockItem stockItem = stockItemRepository.findById(deviceId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found"));

        // Get maxWindowDays from stockItem type
        int maxWindowDays = stockItem.getDevice().getMaxWindowDays();
        Instant maxDueDate = Instant.now().plus(maxWindowDays, ChronoUnit.DAYS);

        // Validate dueDate against maxDueDate
        if (dueDate.isAfter(maxDueDate)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Due date exceeds maximum allowed rental period (" + maxWindowDays + " days)");
        }

        if (!stockItem.getAvailable()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Device not available");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        // Gerät blockieren
        stockItem.setAvailable(false);
        stockItemRepository.save(stockItem);

        Loan loan = new Loan();
        loan.setStockItem(stockItem);
        loan.setUser(user);
        loan.setBorrowedDate(Instant.now());
        loan.setDueDate(dueDate);
        loan.setReturned(false);

        loan = loanRepository.save(loan);

        return mapToDTO(loan);
    }

    public LoanDTO returnDevice(Long stockItemId) {
        Loan loan = loanRepository.findAll().stream()
                .filter(l -> !l.getReturned() && l.getStockItem().getId().equals(stockItemId))
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Active loan not found"));

        loan.setReturned(true);
        loan.getStockItem().setAvailable(true);

        loanRepository.save(loan);
        return mapToDTO(loan);
    }

    public List<LoanDTO> getLoans(String status) {
        List<Loan> loans = switch (status) {
            case "active" -> loanRepository.findByReturnedFalse();
            case "overdue" -> loanRepository.findAll().stream()
                    .filter(l -> !l.getReturned() && l.getDueDate().isBefore(Instant.now()))
                    .toList();
            default -> loanRepository.findAll();
        };

        return loans.stream().map(this::mapToDTO).toList();
    }

    private LoanDTO mapToDTO(Loan loan) {
        return LoanDTO.builder()
                .id(loan.getId())
                .stockItemId(loan.getStockItem().getId())
                .userId(loan.getUser().getId())
                .borrowedDate(loan.getBorrowedDate())
                .dueDate(loan.getDueDate())
                .returned(loan.getReturned())
                .build();
    }
}
