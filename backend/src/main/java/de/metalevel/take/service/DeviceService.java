package de.metalevel.take.service;

import de.metalevel.take.dto.DeviceDTO;
import de.metalevel.take.model.Device;
import de.metalevel.take.repository.DeviceRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
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

    public DeviceDTO create(DeviceDTO dto){
        Device device = new Device();
        device.setId(dto.id());
        device.setAvailable(dto.available());
        device.setBorrowedDate(Instant.from(dto.borrowedDate()));
        device.setBrand(dto.brand());
        device.setName(dto.name());
        device.setQrLink(dto.qrLink());

        device = deviceRepository.save(device);

        return mapToDTO(device);
    }

    public DeviceDTO update(Long id, DeviceDTO dto) {
        Device device = deviceRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found"));

        if (dto.name() != null) {
            device.setName(dto.name());
        }
        if (dto.brand() != null) {
            device.setBrand(dto.brand());
        }
        if (dto.qrLink() != null) {
            device.setQrLink(dto.qrLink());
        }

        device = deviceRepository.save(device);
        return mapToDTO(device);
    }
    private DeviceDTO mapToDTO(Device device) {
        return DeviceDTO.builder()
                .id(device.getId())
                .name(device.getName())
                .brand(device.getBrand())
                .available(device.getAvailable())
                .borrowedDate(Instant.from(device.getBorrowedDate()))
                .qrLink(device.getQrLink())
                .deviceTypeId(device.getDeviceType().getId())
                .userId(device.getUser().getId())
                .build();
    }


}
