package de.metalevel.take.dto;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record StockItemDTO(
        Long id,
        String sku,
        Integer deviceId,
        String userId
) {}
