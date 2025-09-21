package de.metalevel.take.dto;

public record BorrowReq(Long stockItemId, String username, String dueDate) {
}
