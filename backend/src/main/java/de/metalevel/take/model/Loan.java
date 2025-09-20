package de.metalevel.take.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Getter
@Setter
public class Loan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant borrowedDate;
    private Instant dueDate;
    private boolean returned = false;

    @ManyToOne
    @JoinColumn(name = "device")
    private Device device;

    @ManyToOne
    @JoinColumn(name = "user")
    private User user;
}