package de.metalevel.take.dto;

import de.metalevel.take.model.StockItem;
import lombok.Builder;

import java.time.Instant;
import java.util.Set;

@Builder
public record UserDTO(
        String id,
        String username,
        UserRole userRole,
        Instant createdAt,
        Instant updatedAt,
        Set<StockItem> devices
) {}