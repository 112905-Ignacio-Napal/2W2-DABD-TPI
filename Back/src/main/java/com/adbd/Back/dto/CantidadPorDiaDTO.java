package com.adbd.Back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class JuegosPorDiaDTO {
    private Long cantidadJuegos;
    private Long cantidadJugadores;
}
