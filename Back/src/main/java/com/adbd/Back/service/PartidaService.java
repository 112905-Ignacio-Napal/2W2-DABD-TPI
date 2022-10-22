package com.adbd.Back.service;

import com.adbd.Back.dao.IPartidaDao;
import com.adbd.Back.model.Carta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class PartidaService {

    @Autowired
    IPartidaDao partidaDao;

    public Carta getCarta(){
        Random random = new Random();
        Optional<Carta> carta = partidaDao.findById(random.nextLong(1,53));
        return carta.isPresent()? carta.get() : partidaDao.findFirstById(1L);
    }
}
