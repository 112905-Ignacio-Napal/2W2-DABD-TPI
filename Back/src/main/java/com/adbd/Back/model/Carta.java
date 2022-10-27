package com.adbd.Back.model;

import com.adbd.Back.enums.PaloEnum;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;

@Entity
@Table(name = "cartas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
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
    private boolean cartaJugador;
}
