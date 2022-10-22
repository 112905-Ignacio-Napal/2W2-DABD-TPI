package com.adbd.Back.model;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "jugadores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Jugador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String nombre;

    @NotNull
    private String password;

    @OneToMany(mappedBy = "jugador",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Partida> partidas;
}
