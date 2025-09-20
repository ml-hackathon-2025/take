package de.metalevel.take.controller;

import de.metalevel.take.dto.DeviceTypeDTO;
import de.metalevel.take.service.DeviceTypeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("device-type")
@AllArgsConstructor
public class DeviceTypeController {
    private final DeviceTypeService deviceTypeService;

    @GetMapping("/category")
    @Operation(summary = "Get a device type by its category name")
    public ResponseEntity<Set<DeviceTypeDTO>> findByCategoryName(@RequestParam String categoryName) {
        return ResponseEntity.ok(deviceTypeService.findByCategory(categoryName));
    }

    @GetMapping
    public List<DeviceTypeDTO> getAll(){
        return deviceTypeService.getAll();
    }

    @GetMapping("/{id}")
    public DeviceTypeDTO getOne(@PathVariable Long id){
        return deviceTypeService.getOne(id);
    }

    @PostMapping
    @Operation(summary = "Create a new device type with quantity")
    public ResponseEntity<DeviceTypeDTO> createDeviceType(@RequestBody DeviceTypeDTO dto){
        return ResponseEntity.ok(deviceTypeService.createDeviceType(dto));
    }

}
