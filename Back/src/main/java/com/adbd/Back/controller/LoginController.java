package com.adbd.Back.controller;

import com.adbd.Back.model.Jugador;
import com.adbd.Back.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/")
@CrossOrigin(origins = "http://localhost:4200")
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/signin")
    public ResponseEntity login(@RequestBody Jugador jugador){
        return ResponseEntity.ok().body(loginService.registrarUsuario(jugador));
    }

    @PostMapping("/signup")
    public ResponseEntity signin(@RequestBody Jugador jugador){
        if(loginService.validarUsuarioExistente(jugador)){
            return ResponseEntity.ok().body("Usuario existente");
        }
        return ResponseEntity.ok().body(loginService.registrarUsuario(jugador));
    }


}
