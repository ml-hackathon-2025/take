package de.metalevel.take.service;

import de.metalevel.take.dto.CategoryDTO;
import de.metalevel.take.model.Category;
import de.metalevel.take.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

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



    public CategoryDTO createCategory(CategoryDTO dto){
        Category category = new Category();
        category.setId(dto.id());
        category.setName(dto.name());

        category = categoryRepository.save(category);

        return new CategoryDTO(category.getId(), category.getName());
    }
}
