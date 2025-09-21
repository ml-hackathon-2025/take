package de.metalevel.take.service;

import de.metalevel.take.dto.LoanDTO;
import de.metalevel.take.dto.StockItemDTO;
import de.metalevel.take.dto.UserDTO;
import de.metalevel.take.dto.UserRole;
import de.metalevel.take.model.Loan;
import de.metalevel.take.repository.LoanRepository;
import de.metalevel.take.repository.StockItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import software.amazon.awssdk.services.cognitoidentityprovider.CognitoIdentityProviderClient;
import software.amazon.awssdk.services.cognitoidentityprovider.model.*;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    @Value("${cognito.pool.id}")
    private String cognitoPoolId;

    private final LoanRepository loanRepository;
    private final CognitoIdentityProviderClient idp;


    private UserDTO toDto(UserType user) {
        String username = user.username();

        // 3) enrich with stock items from your DB (example: currently borrowed)
        Set<StockItemDTO> stockItems = loanRepository.findByUserIdAndReturnedFalse(username).stream()
                .map(loan -> StockItemDTO.builder()
                        .id(loan.getStockItem().getId())
                        .sku(loan.getStockItem().getSku())
                        .deviceName(loan.getStockItem().getDevice().getName())
                        .build())
                .collect(Collectors.toSet());

        return UserDTO.builder()
                .username(username)
                .stockItems(stockItems)
                .build();
    }

    public List<UserDTO> getAll() {
        ListUsersRequest req = ListUsersRequest.builder()
                .userPoolId(cognitoPoolId)
                .attributesToGet("name")
                .build();
        ListUsersResponse res = idp.listUsers(req);
        // You can return res.users() and res.paginationToken() in a DTO
        return res.users().stream()
                .map(this::toDto).toList();
    }

    public UserDTO getOne(String username) {
        AdminGetUserRequest req = AdminGetUserRequest.builder()
                .userPoolId(cognitoPoolId)
                .username(username)
                .build();

        AdminGetUserResponse resp = idp.adminGetUser(req);

        Set<StockItemDTO> stockItems = loanRepository.findByUserIdAndReturnedFalse(resp.username()).stream()
                .map(loan -> StockItemDTO.builder()
                        .id(loan.getStockItem().getId())
                        .sku(loan.getStockItem().getSku())
                        .deviceName(loan.getStockItem().getDevice().getName())
                        .build())
                .collect(Collectors.toSet());

        return UserDTO.builder()
                .username(username)
                .stockItems(stockItems)
                .build();
    }

    public List<LoanDTO> getLoans(String userId) {
        return loanRepository.findByUserIdAndReturnedFalse(userId).stream()
                .map(stockItem -> LoanDTO.builder()
                        .id(stockItem.getId())
                        .stockItemId(stockItem.getStockItem().getId())
                        .userId(stockItem.getUserId())
                        .borrowedDate(stockItem.getBorrowedDate())
                        .dueDate(stockItem.getDueDate())
                        .returned(stockItem.getReturned())
                        .build())
                .toList();
    }
}