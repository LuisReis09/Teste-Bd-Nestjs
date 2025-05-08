package com.reis.consulta_simples_bd.controller;

import org.springframework.web.bind.annotation.*;

import com.reis.consulta_simples_bd.models.Cliente;
import com.reis.consulta_simples_bd.repository.ClienteRepository;

@RestController
@RequestMapping("/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;
    
    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    @GetMapping("/all")
    public List<Cliente> getClientes() {
        return clienteRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable Long id) {
        return clienteRepository.findById(id)
                .map(cliente -> ResponseEntity.ok(cliente))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/getColumns")
    public String[] getColumns() {
        return new String[]{"id", "nome", "idade"};
    }

    @PostMapping("/create")
    public ResponseEntity<Cliente> createCliente(@RequestBody Cliente cliente) {
        Cliente savedCliente = clienteRepository.save(cliente);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCliente);
    }

    @GetMapping("/delete/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable Long id) {
        if (clienteRepository.existsById(id)) {
            clienteRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
