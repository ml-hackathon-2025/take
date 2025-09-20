package de.metalevel.take.service;

import de.metalevel.take.dto.DeviceTypeDTO;
import de.metalevel.take.repository.DeviceTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DeviceTypeService {
    private final DeviceTypeRepository deviceTypeRepository;

    public Set<DeviceTypeDTO> findByCategory(String categoryName) {
        return deviceTypeRepository.findByCategoryName(categoryName)
                .stream()
                .map(deviceType -> DeviceTypeDTO.builder()
                        .id(deviceType.getId())
                        .name(deviceType.getName())
                        .description(deviceType.getDescription())
                        .build())
                .collect(Collectors.toSet());
    }
}
