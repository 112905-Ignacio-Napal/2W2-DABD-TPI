package com.adbd.Back.model;

import com.adbd.Back.enums.EstadoCartaEnum;
import com.adbd.Back.enums.PaloEnum;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "cartas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Carta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String simbolo;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    private PaloEnum palo;

    @NotNull
    private int valor;

    @NotNull
    private String url;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    private EstadoCartaEnum estado;
}
