package com.adbd.Back.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PaloEnum {
    PICA("pica"),CORAZON("corazon"),TREBOL("trebol"),DIAMANTE("diamante");

    private String descripcion;
}
