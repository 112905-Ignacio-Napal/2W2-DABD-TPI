package com.adbd.Back.service;

import com.adbd.Back.dao.IPartidaDao;
import com.adbd.Back.model.Carta;
import com.adbd.Back.model.Partida;
import com.adbd.Back.repository.ICartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class PartidaService {

    @Autowired
    IPartidaDao partidaDao;

    @Autowired
    ICartaRepository cartaDao;

    private List<Carta> mazo = new ArrayList<>();

    public Carta getCarta(){
        Random random = new Random();
        Carta carta = mazo.get(random.nextInt(0,mazo.size()));
        mazo.remove(carta);
        return carta;
    }

    public List<Carta> getAllCartas() {
        return cartaDao.findAll();
    }

    public Long comenzarPartida(Partida partida) {
        mazo = getAllCartas();
         partidaDao.save(partida);
         return partida.getId();
    }

    public void getManoJugadorByPartida(Long idPartida) {

    }

    public void getManoCroupiertByPartida(Long idPartida) {
    }
}
