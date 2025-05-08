package com.reis.consulta_simples_bd.repository;

import com.reis.consulta_simples_bd.models.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {}