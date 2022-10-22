package com.adbd.Back.controller;

import com.adbd.Back.model.Carta;
import com.adbd.Back.service.PartidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/partida")
public class PartidaController {

    @Autowired
    PartidaService partidaService;

    @GetMapping("/getCarta")
    public ResponseEntity<Carta> getCarta(){
        return new ResponseEntity<>(partidaService.getCarta(),HttpStatus.OK);
    }
}
