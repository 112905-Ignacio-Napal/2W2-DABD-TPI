package com.adbd.Back.model;

import com.adbd.Back.enums.ResultadoEnum;
import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "partidas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Partida {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_jugador")
    private Jugador jugador;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "id_croupier")
    private Croupier croupier;

    @ManyToMany
    @JoinColumn(name = "id")
    private List<Carta> cartasCroupier;

    @ManyToMany
    @JoinColumn(name = "id")
    private List<Carta> cartasJugador;

    @ManyToMany
    @JoinColumn(name = "id")
    private List<Carta> cartas;

    @NotNull
    @Enumerated(value = EnumType.STRING)
    private ResultadoEnum resultado;


}
