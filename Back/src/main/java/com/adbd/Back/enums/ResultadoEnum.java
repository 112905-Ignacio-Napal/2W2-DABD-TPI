package com.adbd.Back.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ResultadoEnum {
    VICTORIA_JUGADOR("Victoria del Jugador"), VICTORIA_CROUPIER("Victoria del Croupier"),EMPATE("Empate");

    private String descripcion;
}
