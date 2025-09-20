package de.metalevel.take.repository;

import de.metalevel.take.model.DeviceType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface DeviceTypeRepository extends JpaRepository<DeviceType, Long> {
    Set<DeviceType> findByCategoryName(String categoryName);
}
