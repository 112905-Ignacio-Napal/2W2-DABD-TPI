package com.adbd.Back.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;
import lombok.*;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "jugadores")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Jugador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String password;

    @NotNull
    private String username;

 //   @NotNull
/*    @OneToMany
    @JoinColumn(name = "id_jugador")*/

    @OneToMany(targetEntity = Partida.class)
    @JsonIgnore
    //@JoinColumn(name = "id_jugador", referencedColumnName = "id")
    private List<Partida> partidas;
}
