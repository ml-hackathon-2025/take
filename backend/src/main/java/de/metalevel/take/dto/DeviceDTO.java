package de.metalevel.take.dto;

import lombok.Builder;

@Builder
public record DeviceDTO(Integer id,
                        String name,
                        Integer maxWindowDays,
                        String description) {
}
