package com.adbd.Back.dao;

import com.adbd.Back.model.Jugador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IJugadorDao  extends JpaRepository<Jugador,Long> {
    boolean existsByUsername(Jugador jugador);
}
