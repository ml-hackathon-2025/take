package de.metalevel.take.service;

import de.metalevel.take.dto.DeviceDTO;
import de.metalevel.take.model.Device;
import de.metalevel.take.repository.DeviceRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;


@Service
@AllArgsConstructor
public class DeviceService {

    private final DeviceRepository deviceRepository;

    public List<DeviceDTO> getAll(){
        return deviceRepository.findAll()
                .stream()
                .map(device -> DeviceDTO.builder()
                        .id(device.getId())
                        .name(device.getName())
                        .brand(device.getBrand())
                        .available(device.getAvailable())
                        .borrowedDate(Instant.from(device.getBorrowedDate()))
                        .qrLink(device.getQrLink())
                        .deviceTypeId(device.getDeviceType().getId())
                        .userId(device.getUser().getId())
                        .build())
                .toList();
    }

    public DeviceDTO getOne(Long id){
        return deviceRepository.findById(id)
                .map(device -> DeviceDTO.builder()
                        .id(device.getId())
                        .name(device.getName())
                        .brand(device.getBrand())
                        .available(device.getAvailable())
                        .borrowedDate(Instant.from(device.getBorrowedDate()))
                        .qrLink(device.getQrLink())
                        .deviceTypeId(device.getDeviceType().getId())
                        .userId(device.getUser().getId())
                        .build())
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

        return new DeviceDTO(device.getId(),
                device.getName(),
                device.getBrand(),
                device.getDeviceType().getId(),
                device.getAvailable(),
                device.getBorrowedDate(),
                device.getQrLink(),
                device.getUser().getId());
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
        return new DeviceDTO(device.getId(),
                device.getName(),
                device.getBrand(),
                device.getDeviceType().getId(),
                device.getAvailable(),
                device.getBorrowedDate(),
                device.getQrLink(),
                device.getUser().getId());
    }


}
