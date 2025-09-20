package de.metalevel.take.dto;

import lombok.Builder;

@Builder
public record DeviceTypeDTO (Integer id, String name, String description) {
}
