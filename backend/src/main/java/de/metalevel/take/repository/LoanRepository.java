package de.metalevel.take.repository;

import de.metalevel.take.model.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByReturnedFalse();
    List<Loan> findByUserId(Long userId);
}
