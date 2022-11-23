package com.adbd.Back.controller;

import com.adbd.Back.model.Jugador;
import com.adbd.Back.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/signin")
    public ResponseEntity login(@RequestBody Jugador jugador){
        Jugador jugadorEncontrado = loginService.validarCredenciales(jugador);
        if(jugadorEncontrado != null){
            return ResponseEntity.ok().body(jugadorEncontrado);
        }else{
            return new ResponseEntity("Credenciales inválidas",HttpStatus.UNAUTHORIZED);
        }

    }

    @PostMapping("/signup")
    public ResponseEntity signin(@RequestBody Jugador jugador){
        if(loginService.validarUsuarioExistente(jugador)){
            return new ResponseEntity("Usuario existente",HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok().body(loginService.registrarUsuario(jugador));
    }


}
