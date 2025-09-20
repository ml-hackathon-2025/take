package de.metalevel.take.controller;

import de.metalevel.take.dto.DeviceDTO;
import de.metalevel.take.service.DeviceService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
@AllArgsConstructor
public class DeviceController {
    private final DeviceService deviceService;

    @GetMapping
    public List<DeviceDTO> getAll() { return deviceService.getAll(); }

    @GetMapping("/{id}")
    public DeviceDTO getOne(@PathVariable Long id) { return deviceService.getOne(id); }

    @PostMapping
    public DeviceDTO create(@RequestBody DeviceDTO dto) { return deviceService.create(dto); }

    @PatchMapping("/{id}")
    public DeviceDTO update(@PathVariable Long id, @RequestBody DeviceDTO dto) {
        return deviceService.update(id, dto);
    }
}
