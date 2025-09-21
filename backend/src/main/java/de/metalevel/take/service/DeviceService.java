package de.metalevel.take.service;

import de.metalevel.take.dto.DeviceDTO;
import de.metalevel.take.model.Device;
import de.metalevel.take.repository.DeviceRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class DeviceService {
    private final DeviceRepository deviceRepository;

    public List<DeviceDTO> getAll(){
        return deviceRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public DeviceDTO getOne(Long id){
        return deviceRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "DeviceType not found"));
    }

    public DeviceDTO createDeviceType(DeviceDTO dto){
        Device entity = new Device();
        entity.setId(dto.id());
        entity.setName(dto.name());
        entity.setMaxWindowDays(dto.maxWindowDays());
        entity.setDescription(dto.description());

        entity = deviceRepository.save(entity);

        return mapToDTO(entity);
    }

    public DeviceDTO mapToDTO(Device device){
        return DeviceDTO.builder()
                .id(device.getId())
                .name(device.getName())
                .description(device.getDescription())
                .build();
    }
}
