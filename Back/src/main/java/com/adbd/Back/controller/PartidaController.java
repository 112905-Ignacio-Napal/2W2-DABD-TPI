package com.adbd.Back.controller;

import com.adbd.Back.model.Carta;
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
    public ResponseEntity<Carta> getCarta(@RequestParam Long idPartida, @RequestParam boolean tipoJugador){
        return new ResponseEntity<>(partidaService.getCarta(idPartida,tipoJugador),HttpStatus.OK);
    }

    //YA ESTA
    @GetMapping ("/comenzar")
    public ResponseEntity<Partida> comenzarPartida(@RequestParam Long idJugador){
        return new ResponseEntity<>(partidaService.comenzarPartida(idJugador),HttpStatus.OK);
    }

    @GetMapping("/plantarse")
    @ResponseBody
    public ResponseEntity<Optional<Partida>> plantarse(@RequestParam Long idPartida){
        var result = partidaService.plantarse(idPartida);

        if (result != null)
            return ResponseEntity.ok(result);
        else
            return ResponseEntity.notFound().build();
    }

    @GetMapping("/getPartidaEnCurso")
    @ResponseBody
    public ResponseEntity<Partida> getPartidaEnCurso(@RequestParam Long idJugador){
        var result = partidaService.getPartidaEnCurso(idJugador);
        if (result != null)
            return ResponseEntity.ok(result);
        else
            return ResponseEntity.notFound().build();
    }

}
