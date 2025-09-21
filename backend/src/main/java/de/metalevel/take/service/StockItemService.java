package de.metalevel.take.service;

import de.metalevel.take.dto.StockItemDTO;
import de.metalevel.take.model.StockItem;
import de.metalevel.take.repository.StockItemRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;


@Service
@AllArgsConstructor
public class StockItemService {

    private final StockItemRepository stockItemRepository;

    public List<StockItemDTO> getAll(){
        return stockItemRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public StockItemDTO getOne(Long id){
        return stockItemRepository.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "DeviceType not found"));
    }

    public StockItemDTO create(StockItemDTO dto){
        StockItem stockItem = new StockItem();
        stockItem.setId(dto.id());

        stockItem = stockItemRepository.save(stockItem);

        return mapToDTO(stockItem);
    }

    public StockItemDTO update(Long id, StockItemDTO dto) {
        StockItem device = stockItemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Device not found"));

        if (dto.sku() != null) {
            device.setSku(dto.sku());
        }

        device = stockItemRepository.save(device);
        return mapToDTO(device);
    }
    private StockItemDTO mapToDTO(StockItem stockItem) {
        return StockItemDTO.builder()
                .id(stockItem.getId())
                .sku(stockItem.getSku())
                .deviceId(stockItem.getDevice().getId())
                .build();
    }


}
