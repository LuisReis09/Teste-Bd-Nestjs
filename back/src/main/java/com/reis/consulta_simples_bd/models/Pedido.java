package com.reis.consulta_simples_bd.models;
import jakarta.persistence.Entity;

import com.reis.consulta_simples_bd.models.Cliente;
import com.reis.consulta_simples_bd.models.Produto;
import java.util.HashMap;

@Entity
@Table(name = "Pedido")
public class Pedido {
    @jakarta.persistence.Id
    @jakarta.persistence.GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    @jakarta.persistence.ManyToOne
    private Cliente cliente;

    @jakarta.persistence.ManyToOne
    private Produto produto;

    private int quantidade;
    private double valorTotal;

    public Pedido() {
    }

    public Pedido(Long id, Cliente cliente, Produto produto, int quantidade, double valorTotal) {
        this.id = id;
        this.cliente = cliente;
        this.produto = produto;
        this.quantidade = quantidade;
        this.valorTotal = valorTotal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public int getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(int quantidade) {
        this.quantidade = quantidade;
    }

    public double getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(double valorTotal) {
        this.valorTotal = valorTotal;
    }

    public Object getInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("id", this.id);
        info.put("cliente", this.cliente.getNome());
        info.put("produto", this.produto.getNome());
        info.put("quantidade", this.quantidade);
        info.put("valorTotal", this.valorTotal);
        return info;
    }

    public String[] getColumns() {
        return new String[]{"id", "cliente", "produto", "quantidade", "valorTotal"};
    }
}
