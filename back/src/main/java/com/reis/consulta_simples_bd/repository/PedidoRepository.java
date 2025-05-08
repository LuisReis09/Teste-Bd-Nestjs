package com.reis.consulta_simples_bd.repository;

import com.reis.consulta_simples_bd.models.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {}
