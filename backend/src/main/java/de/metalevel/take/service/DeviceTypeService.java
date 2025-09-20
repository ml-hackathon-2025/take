package de.metalevel.take.service;

import de.metalevel.take.dto.DeviceTypeDTO;
import de.metalevel.take.model.DeviceType;
import de.metalevel.take.repository.DeviceTypeRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class DeviceTypeService {
    private final DeviceTypeRepository deviceTypeRepository;

    public Set<DeviceTypeDTO> findByCategory(String categoryName) {
        return deviceTypeRepository.findByCategoryName(categoryName)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toSet());
    }

    public List<DeviceTypeDTO> getAll(){
        return deviceTypeRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public DeviceTypeDTO getOne(Long id){
        return deviceTypeRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "DeviceType not found"));
    }

    public DeviceTypeDTO createDeviceType(DeviceTypeDTO dto){
        DeviceType entity = new DeviceType();
        entity.setId(dto.id());
        entity.setName(dto.name());
        entity.setMaxWindowDays(dto.maxWindowDays());
        entity.setDescription(dto.description());

        entity = deviceTypeRepository.save(entity);

        return mapToDTO(entity);
    }

    public DeviceTypeDTO mapToDTO(DeviceType deviceType){
        return DeviceTypeDTO.builder()
                .id(deviceType.getId())
                .name(deviceType.getName())
                .description(deviceType.getDescription())
                .build();
    }
}
