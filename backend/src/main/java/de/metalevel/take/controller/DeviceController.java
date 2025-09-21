package de.metalevel.take.controller;

import de.metalevel.take.dto.StockItemDTO;
import de.metalevel.take.service.StockItemService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/devices")
@AllArgsConstructor
public class DeviceController {
    private final StockItemService stockItemService;

    @GetMapping
    public List<StockItemDTO> getAll() { return stockItemService.getAll(); }

    @GetMapping("/{id}")
    public StockItemDTO getOne(@PathVariable Long id) { return stockItemService.getOne(id); }

    @PostMapping
    public StockItemDTO create(@RequestBody StockItemDTO dto) { return stockItemService.create(dto); }

    @PatchMapping("/{id}")
    public StockItemDTO update(@PathVariable Long id, @RequestBody StockItemDTO dto) {
        return stockItemService.update(id, dto);
    }
}
