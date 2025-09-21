package de.metalevel.take.controller;

import de.metalevel.take.dto.DeviceDTO;
import de.metalevel.take.service.DeviceService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/device-type")
@AllArgsConstructor
public class DeviceTypeController {
    private final DeviceService deviceService;


    @GetMapping
    public List<DeviceDTO> getAll(){
        return deviceService.getAll();
    }

    @GetMapping("/{id}")
    public DeviceDTO getOne(@PathVariable Long id){
        return deviceService.getOne(id);
    }

    @PostMapping
    @Operation(summary = "Create a new device type with quantity")
    public ResponseEntity<DeviceDTO> createDeviceType(@RequestBody DeviceDTO dto){
        return ResponseEntity.ok(deviceService.createDeviceType(dto));
    }

}
