package de.metalevel.take.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @Size(max = 255)
    @Column(name = "id", nullable = false)
    private String id;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Size(max = 255)
    @Column(name = "password")
    private String password;

    @Size(max = 255)
    @Column(name = "username")
    private String username;

    @Lob
    @Column(name = "role")
    private String role;

    @OneToMany(mappedBy = "user")
    private Set<Device> devices = new LinkedHashSet<>();

}