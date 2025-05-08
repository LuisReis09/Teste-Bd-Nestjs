package com.reis.consulta_simples_bd.models;
import jakarta.persistence.Entity;
import java.util.HashMap;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
@Table(name = "Produto")
public class Produto {

    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String descricao;
    private double preco;
    private int quantidadeEstoque;

    public Produto() {
    }

    public Produto(Long id, String nome, String descricao, double preco, int quantidadeEstoque) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    public int getQuantidadeEstoque() {
        return quantidadeEstoque;
    }

    public void setQuantidadeEstoque(int quantidadeEstoque) {
        this.quantidadeEstoque = quantidadeEstoque;
    }

    public Object getInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("id", this.id);
        info.put("nome", this.nome);
        info.put("descricao", this.descricao);
        info.put("preco", this.preco);
        info.put("quantidadeEstoque", this.quantidadeEstoque);
        return info;
    }
}
