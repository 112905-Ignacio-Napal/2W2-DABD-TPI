package com.adbd.Back.service;

import com.adbd.Back.dao.IJugadorDao;
import com.adbd.Back.dao.IPartidaDao;
import com.adbd.Back.dto.CantidadPorDiaDTO;
import com.adbd.Back.dto.PromedioBlackjacksDTO;
import com.adbd.Back.dto.VictoriasCroupierDTO;
import com.adbd.Back.enums.ResultadoEnum;
import com.adbd.Back.model.Carta;
import com.adbd.Back.model.Jugador;
import com.adbd.Back.model.Partida;
import com.adbd.Back.repository.ICartaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PartidaService {

    @Autowired
    IPartidaDao partidaDao;

    @Autowired
    ICartaRepository cartaDao;

    @Autowired
    IJugadorDao jugadorDao;

    public Carta getCarta(Long idPartida, boolean isJugador) {
        List<Carta> mazo = getAllCartas();
        Optional<Partida> partida = partidaDao.findById(idPartida);

        List<Carta> cartasEnJuego = partida.get().getCartas();
        mazo.removeAll(cartasEnJuego);

        Random random = new Random();
        Carta carta = mazo.get(random.nextInt(0, mazo.size() - 1));

        if (isJugador) {
            carta.setCartaJugador(true);
        } else {
            carta.setCartaJugador(false);
        }

        cartasEnJuego.add(carta);
        partidaDao.save(partida.get());
        return carta;
    }

    public List<Carta> getAllCartas() {
        return cartaDao.findAll();
    }

    public Partida comenzarPartida(Long idJugador) {
        Optional<Jugador> jugador = jugadorDao.findById(idJugador);

        Partida partida = new Partida();
        if (jugador.isPresent()){
            partida.setJugador(jugador.get());
        }
        partida.setFecha(new Date());
        partidaDao.save(partida);
        return partida;
    }


    public Optional<Partida> plantarse(Long idPartida) {
        Optional<Partida> partida = partidaDao.findById(idPartida);
        if(obtenerPuntaje(partida.get().getId(), true) > 21){
            partida.get().setResultado(validarResultado(idPartida));
            partidaDao.save(partida.get());
            return partida;
        }

        Long puntajeCroupier = obtenerPuntaje(idPartida, false);

        while (puntajeCroupier < 17){
            getCarta(idPartida,false);
            puntajeCroupier = obtenerPuntaje(idPartida,false);
        }
        partida.get().setResultado(validarResultado(idPartida));
        partidaDao.save(partida.get());

        return partida;
    }

    private Long obtenerPuntaje(Long idPartida, boolean isJugador) {
        Optional<Partida> partida = partidaDao.findById(idPartida);
        Long puntaje = 0L;

        List<Carta> cartas = partida.get().getCartas();

        if(isJugador){
            for (Carta carta : cartas.stream().filter(c -> c.isCartaJugador()).collect(Collectors.toList())) {
                puntaje+= carta.getValor();
                if(carta.getSimbolo().equalsIgnoreCase("A") && puntaje + 10 <= 21){
                    puntaje += 10;
                }
            }
        }else{
            for (Carta carta : cartas.stream().filter(c -> !c.isCartaJugador()).collect(Collectors.toList())) {
                puntaje+= carta.getValor();
                if(carta.getSimbolo().equalsIgnoreCase("A") && puntaje + 10 <= 21){
                    puntaje += 10;
                }
            }
        }

        return puntaje;
    }

    private ResultadoEnum validarResultado(Long idPartida) {
        Optional<Partida> partida = partidaDao.findById(idPartida);

        Long puntajeJugador = obtenerPuntaje(idPartida,true);
        Long puntajeCroupier = obtenerPuntaje(idPartida,false);

        if (puntajeJugador <= 21 && puntajeJugador > puntajeCroupier || puntajeCroupier > 21) {
            return ResultadoEnum.VICTORIA_JUGADOR;
        }
        if (puntajeCroupier <= 21 && puntajeCroupier > puntajeJugador || puntajeJugador > 21){
            return ResultadoEnum.VICTORIA_CROUPIER;
        }
        else{
            return ResultadoEnum.EMPATE;
        }
    }

    public Partida getPartidaEnCurso(Long idJugador){
        return partidaDao.findTopByJugador_IdOrderByIdDesc(idJugador);
    }

    public VictoriasCroupierDTO getVictoriasCroupier(Long idJugador) {
        List<Partida> partidas = partidaDao.findAllByJugador_Id(idJugador);
        VictoriasCroupierDTO reporte = new VictoriasCroupierDTO();
        if(!partidas.isEmpty()){
            int partidasGanadas = 0;
            for (Partida partida: partidas) {
                if(partida.getResultado().equals(ResultadoEnum.VICTORIA_CROUPIER)){
                    partidasGanadas++;
                }
            }
            reporte.setVictorias((long) partidasGanadas);
            reporte.setPartidasJugadas((long) partidas.size());
        }
        return reporte;
    }

    public CantidadPorDiaDTO getCantidadPorDia(Date fecha) {
        List<Partida> partidas = partidaDao.findPartidasByFecha(fecha);
        Set<Jugador> jugadores = new HashSet<>();
        jugadores.addAll(partidas.stream().map(p -> p.getJugador()).collect(Collectors.toList()));
        return new CantidadPorDiaDTO((long) partidas.size(), (long) jugadores.size());
    }

    public List<PromedioBlackjacksDTO> getPromedioBlackjack() {
        List<Partida> partidas = partidaDao.findPartidasByResultadoIsNotNull();

        List<PromedioBlackjacksDTO> promedios = new ArrayList<>();

       Map<Jugador,List<Partida>> partidasPorJugador = partidas.stream().collect(Collectors.groupingBy(p -> p.getJugador()));

        for (Map.Entry<Jugador,List<Partida>> entry: partidasPorJugador.entrySet()) {
            String nombreJugador = entry.getKey().getUsername();
            List<Partida> partidasJugador = entry.getValue();
            int cantidadBlackjacksJugador = 0;
            int cantidadBlackjacksCroupier = 0;
            for (Partida partida: partidasJugador) {
                Long puntajeJugador = obtenerPuntaje(partida.getId(),true);
                Long puntajeCroupier = obtenerPuntaje(partida.getId(),false);
                if(puntajeJugador == 21) cantidadBlackjacksJugador++;
                if(puntajeCroupier == 21) cantidadBlackjacksCroupier++;
            }
            promedios.add(new PromedioBlackjacksDTO(partidasJugador.size(),cantidadBlackjacksJugador,cantidadBlackjacksCroupier,nombreJugador));
        }
        return promedios;
    }


}
