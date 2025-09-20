package de.metalevel.take.dto;

import lombok.Builder;

@Builder
public record CategoryDTO(Long id, String name) {
}
