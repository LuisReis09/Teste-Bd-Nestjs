package com.reis.consulta_simples_bd.repository;

import com.reis.consulta_simples_bd.models.Produto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {}
