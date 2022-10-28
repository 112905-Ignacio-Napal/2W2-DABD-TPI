package com.adbd.Back.service;

import com.adbd.Back.dao.IJugadorDao;
import com.adbd.Back.dao.IPartidaDao;
import com.adbd.Back.enums.ResultadoEnum;
import com.adbd.Back.model.Carta;
import com.adbd.Back.model.Jugador;
import com.adbd.Back.model.Partida;
import com.adbd.Back.repository.ICartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class PartidaService {

    @Autowired
    IPartidaDao partidaDao;

    @Autowired
    ICartaRepository cartaDao;

    @Autowired
    IJugadorDao jugadorDao;


    private List<Carta> mazo = new ArrayList<>();

    public Carta getCarta(Long idPartida, boolean tipoJugador) {

        //ESTO NO SE SI ESTA BIEN!!!!
        mazo = getAllCartas();

        //obtenemos la partida
        Optional<Partida> partida = partidaDao.findById(idPartida);

        //obtenemos las cartas de la partida
        List<Carta> cartas = partida.get().getCartas();


        //generamos un numero random
        Random random = new Random();

        //obtenemos una carta del mazo con el numero al azar
        Carta carta = mazo.get(random.nextInt(0, mazo.size()));

        //quitamos la carta del mazo
        mazo.remove(carta);


        //agregamos la carta a la lista de cartas y seteamos si el que obtuvo la carta es un jugador (true) o un croupier (false)
        if (tipoJugador) {
            carta.setCartaJugador(true);
            cartas.add(carta);
        } else {
            carta.setCartaJugador(false);
            cartas.add(carta);
        }


        //seteamos las cartas a las cartas de la partida
        partida.get().setCartas(cartas);

        //guardamos los cambios
        partidaDao.save(partida.get());


        return carta;
    }

    public List<Carta> getAllCartas() {
        return cartaDao.findAll();
    }

    public Long comenzarPartida(Long idJugador) {

        //ESTO NO SE SI ESTÀ BIEN, TAMBIEN LO PUSE EL METODO GETCARTA
        mazo = getAllCartas();

        //Obtenemos el jugador
        Optional<Jugador> jugador = jugadorDao.findById(idJugador);

        //asociamos el jugador a la partida
        Partida partida = new Partida();
        if (jugador.isPresent())
            partida.setJugador(jugador.get());
        partidaDao.save(partida);

        //retornamos el id de la partida con el que el front se comunicara con el back
        return partida.getId();
    }


    public Optional<Partida> plantarse(Long idPartida) {
        Optional<Partida> partida = partidaDao.findById(idPartida);
        Long puntajeCroupier = obtenerPuntaje(idPartida, false);

        //le damos las cartas que le faltan al croupier cuando el jugador se planta (No se si esta bien la logica)
        while (puntajeCroupier <= 21){
            getCarta(idPartida,false);
            puntajeCroupier = obtenerPuntaje(idPartida,false);
        }

        partida.get().setResultado(validarPuntaje(idPartida));

            if (!partida.isPresent()) {
                return null;
            }
        return partida;
    }


    //Con este metodo obtengo EL PUNTAJE actual de la partida del jugador que le pase como parametro
    private Long obtenerPuntaje(Long idPartida, boolean tipoJugador) {
        Optional<Partida> partida = partidaDao.findById(idPartida);
        Long puntajeJugador = 0L;
        Long puntajeCroupier = 0L;

        //obtenemos las cartas de la partida
        List<Carta> cartas = partida.get().getCartas();

        for (Carta carta : cartas) {
            if (carta.isCartaJugador()) {
                puntajeJugador += carta.getValor();
            } else {
                puntajeCroupier += carta.getValor();
            }

        }

        if (tipoJugador) return puntajeJugador;
        else return puntajeCroupier;
    }



    //VALIDAR LA LOGICA DE ESTE METODO
    private ResultadoEnum validarPuntaje(Long idPartida) {
        Optional<Partida> partida = partidaDao.findById(idPartida);

        Long puntajeJugador = obtenerPuntaje(idPartida,true);
        Long puntajeCroupier = obtenerPuntaje(idPartida,false);

        if (puntajeJugador <= 21 && puntajeJugador > puntajeCroupier) {
            return ResultadoEnum.VICTORIA_JUGADOR;
        }
        if (puntajeJugador > 21 && puntajeCroupier <= 21){
            return ResultadoEnum.VICTORIA_CROUPIER;
        }
        else{
            return ResultadoEnum.EMPATE;
        }
    }
}
