package de.metalevel.take.dto;

import lombok.Builder;

import java.time.Instant;

@Builder
public record DeviceDTO(
        Long id,
        String name,
        String brand,
        Long deviceTypeId,
        boolean available,
        Instant borrowedDate,
        String qrLink,
        Long userId
) {}
