package de.metalevel.take.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "device")
public class Device {
    @Id
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "available")
    private Boolean available;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "device_type_id", nullable = false)
    private de.metalevel.take.model.DeviceType deviceType;

    @Column(name = "borrowed_date")
    private Instant borrowedDate;

    @Size(max = 255)
    @Column(name = "brand")
    private String brand;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Size(max = 255)
    @Column(name = "qr_link")
    private String qrLink;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private de.metalevel.take.model.User user;

}