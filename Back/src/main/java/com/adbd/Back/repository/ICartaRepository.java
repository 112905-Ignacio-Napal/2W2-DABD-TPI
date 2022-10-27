package com.adbd.Back.repository;

import com.adbd.Back.model.Carta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ICartaRepository extends JpaRepository<Carta,Long> {

}
