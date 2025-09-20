package de.metalevel.take.dto;

import lombok.Builder;

@Builder
public record DeviceTypeDTO (Long id,
                             String name,
                             Integer maxWindowDays,
                             String description) {
}
