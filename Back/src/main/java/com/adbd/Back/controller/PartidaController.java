package com.adbd.Back.controller;

import com.adbd.Back.model.Carta;
import com.adbd.Back.model.Jugador;
import com.adbd.Back.model.Partida;
import com.adbd.Back.service.PartidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/partida")
@CrossOrigin()
public class PartidaController {

    @Autowired
    PartidaService partidaService;

    @GetMapping("/getCarta")
    public ResponseEntity<Carta> getCarta(@RequestParam Long id, @RequestParam boolean tipoJugador){
        return new ResponseEntity<>(partidaService.getCarta(id,tipoJugador),HttpStatus.OK);
    }

    //YA ESTA
    @GetMapping ("/comenzar")
    public ResponseEntity<Long> comenzarPartida(@RequestParam Long id){
        return new ResponseEntity<>(partidaService.comenzarPartida(id),HttpStatus.OK);
    }


    @GetMapping("/plantarse")
    @ResponseBody
    //ResponseEntity<Optional<Factura>>
    public ResponseEntity<Optional<Partida>> plantarse(@RequestParam Long id){
        var result = partidaService.plantarse(id);

        if (result != null)
            return ResponseEntity.ok(result);
        else
            return ResponseEntity.notFound().build();

    }


}
