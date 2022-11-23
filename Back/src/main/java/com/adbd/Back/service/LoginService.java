package com.adbd.Back.service;

import com.adbd.Back.dao.IJugadorDao;
import com.adbd.Back.model.Jugador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
    @Autowired
    private IJugadorDao jugadorDao;

    public Jugador registrarUsuario(Jugador jugador){
         return jugadorDao.save(jugador);
    }

    public boolean validarUsuarioExistente(Jugador jugador) {
        return jugadorDao.existsByUsername(jugador.getUsername());
    }

    public Jugador validarCredenciales(Jugador jugador) {
        return jugadorDao.findJugadorByUsernameEqualsAndPasswordEquals(jugador.getUsername(), jugador.getPassword());
    }
}
