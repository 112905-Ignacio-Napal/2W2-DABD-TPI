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

    @ManyToOne
    @JoinColumn(name = "id_jugador")
    private Jugador jugador;

    @OneToMany(mappedBy = "partidas")
    @JoinColumn(name = "id_partida",referencedColumnName = "id")
    private List<Carta> manos;

    @Enumerated(EnumType.STRING)
    private ResultadoEnum resultado;
}
