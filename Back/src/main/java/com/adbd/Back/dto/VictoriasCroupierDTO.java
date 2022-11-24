package com.adbd.Back.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class VictoriasCroupierDTO {
    private Long victorias;
    private Long partidasJugadas;

    public VictoriasCroupierDTO(){
        this.victorias = 0L;
        this.partidasJugadas = 0L;
    }
}
