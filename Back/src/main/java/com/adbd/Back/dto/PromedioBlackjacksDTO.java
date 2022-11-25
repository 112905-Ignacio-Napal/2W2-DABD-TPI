package com.adbd.Back.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@ToString
public class PromedioBlackjacksDTO {

    private String nombreJugador;
    private int cantidadPartidas;
    private int cantidadBlackjacksJugador;
    private double promedioBlackjacksJugador;
    private int cantidadBlackJacksCroupier;
    private double promedioBlackjacksCroupier;

    public PromedioBlackjacksDTO(int cantidadPartidas,int cantidadBlackjacksJugador,int cantidadBlackJacksCroupier,String nombreJugador){
        this.cantidadPartidas = cantidadPartidas;
        this.cantidadBlackjacksJugador = cantidadBlackjacksJugador;
        this.cantidadBlackJacksCroupier = cantidadBlackJacksCroupier;
        this.nombreJugador = nombreJugador;
        this.promedioBlackjacksJugador = cantidadBlackjacksJugador > 0?  (double)cantidadBlackjacksJugador / cantidadPartidas : 0;
        this.promedioBlackjacksCroupier = cantidadBlackJacksCroupier > 0? (double)cantidadBlackJacksCroupier / cantidadPartidas : 0;
    }
}
