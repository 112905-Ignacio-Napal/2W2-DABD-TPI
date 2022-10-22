package com.adbd.Back.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "croupiers")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Croupier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "croupier",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Partida> partidas;
}
