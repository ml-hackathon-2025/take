package de.metalevel.take.controller;

import de.metalevel.take.dto.DeviceTypeDTO;
import de.metalevel.take.service.DeviceTypeService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@RestController
@RequestMapping("device-type")
@AllArgsConstructor
public class DeviceTypeController {
    private final DeviceTypeService deviceTypeService;

    @GetMapping("/category")
    @Operation(summary = "Get a device type by its category name")
    public Set<DeviceTypeDTO> findByCategoryName(@RequestParam String categoryName) {
        return deviceTypeService.findByCategory(categoryName);
    }
}
