package com.adbd.Back.dao;

import com.adbd.Back.model.Partida;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPartidaDao extends JpaRepository<Partida,Long> {
    Partida findTopByJugador_IdOrderByIdDesc(Long idJugador);
}
