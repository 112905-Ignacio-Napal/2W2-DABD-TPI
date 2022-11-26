package com.adbd.Back.dao;

import com.adbd.Back.model.Partida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface IPartidaDao extends JpaRepository<Partida,Long> {
    Partida findTopByJugador_IdOrderByIdDesc(Long idJugador);
    List<Partida> findAllByJugador_Id(Long idJugador);
    List<Partida> findAllByJugador_IdAndResultadoIsNotNull(Long idJugador);
    List<Partida> findPartidasByFecha(Date fecha);
    List<Partida> findPartidasByResultadoIsNotNull();
}
