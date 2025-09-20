package de.metalevel.take.service;

import de.metalevel.take.dto.CategoryDTO;
import de.metalevel.take.model.Category;
import de.metalevel.take.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public List<CategoryDTO> getAll() {
        return categoryRepository.findAll()
                .stream()
                .map(category -> CategoryDTO.builder()
                        .id(category.getId())
                        .name(category.getName())
                        .build())
                .toList();
    }

    public CategoryDTO getOne(Long id){
        return categoryRepository.findById(id)
                .map(category -> CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
    }

    public void deleteCategory(Long id) {
        if (!categoryRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "DeviceType not found");
        }
        categoryRepository.deleteById(id);
    }


    public CategoryDTO createCategory(CategoryDTO dto){
        Category category = new Category();
        category.setId(dto.id());
        category.setName(dto.name());

        category = categoryRepository.save(category);

        return new CategoryDTO(category.getId(), category.getName());
    }
}
