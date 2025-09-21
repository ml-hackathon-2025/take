package de.metalevel.take.repository;

import de.metalevel.take.model.StockItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface StockItemRepository extends JpaRepository<StockItem, Long> {
}
