package de.metalevel.take.dto;

import lombok.Builder;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDate;

@Builder
public record LoanDTO(
        Integer id,
        Long stockItemId,
        String userId,
        Instant borrowedDate,
        Instant dueDate,
        boolean returned
) {}
