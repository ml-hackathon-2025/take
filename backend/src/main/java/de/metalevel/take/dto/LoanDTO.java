package de.metalevel.take.dto;

import lombok.Builder;

import java.time.Instant;

@Builder
public record LoanDTO(
        Long id,
        Long deviceId,
        Long userId,
        Instant borrowedDate,
        Instant dueDate,
        boolean returned
) {}
