package com.adbd.Back.model;

import com.adbd.Back.enums.ResultadoEnum;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "partidas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Partida {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToOne(targetEntity = Jugador.class)
    @JoinColumn(name = "id_jugador", referencedColumnName = "id")
    private Jugador jugador;


    @ManyToMany
    @JoinColumn(name = "id_partida",referencedColumnName = "id")
    private List<Carta> cartas;

    @Enumerated(EnumType.STRING)
    private ResultadoEnum resultado;
}
