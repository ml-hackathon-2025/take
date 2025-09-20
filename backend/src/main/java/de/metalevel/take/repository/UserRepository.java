package de.metalevel.take.repository;

import de.metalevel.take.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {}