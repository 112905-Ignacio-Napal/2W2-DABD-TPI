package com.adbd.Back.controller;

import com.adbd.Back.model.Carta;
import com.adbd.Back.model.Partida;
import com.adbd.Back.service.PartidaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/partida")
@CrossOrigin()
public class PartidaController {

    @Autowired
    PartidaService partidaService;

    @GetMapping("/getCarta")
    public ResponseEntity<Carta> getCarta(){
        return new ResponseEntity<>(partidaService.getCarta(),HttpStatus.OK);
    }

    @GetMapping("/comenzar")
    public ResponseEntity<Long> comenzarPartida(@RequestParam Partida partida){
        return new ResponseEntity<>(partidaService.comenzarPartida(partida),HttpStatus.OK);
    }

    @PostMapping("/jugador/getMano")
    public ResponseEntity<Boolean> getManoJugadorByPartida(@RequestParam Long idPartida){
        partidaService.getManoJugadorByPartida(idPartida);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }

    @PostMapping("/croupier/getMano")
    public ResponseEntity<Boolean> getManoCroupiertByPartida(@RequestParam Long idPartida){
        partidaService.getManoCroupiertByPartida(idPartida);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }
}
