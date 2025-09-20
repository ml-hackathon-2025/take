package de.metalevel.take.dto;

import de.metalevel.take.model.Device;
import lombok.Builder;

import java.time.Instant;
import java.util.Set;

@Builder
public record UserDTO(
        Long id,
        String name,
        String userRole,
        Instant createdAt,
        Instant updatedAt,
        Set<Device> devices
) {}