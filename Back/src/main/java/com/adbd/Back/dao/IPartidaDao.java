package com.adbd.Back.dao;

import com.adbd.Back.model.Carta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPartidaDao extends JpaRepository<Carta,Long> {
    Carta findFirstById(Long id);
}
