package com.flowpay.atendimento.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/api/atendimento")
public class AtendimentoController {

    private final Map<String, Integer> filas = new HashMap<>();
    private final Map<String, List<Map<String, Object>>> atendentes = new HashMap<>();
    private final Map<String, List<Map<String, Object>>> atendimentosEmAndamento = new HashMap<>();
    private int nextId = 1;

    public AtendimentoController() {
        // Inicializa as estruturas
        for (String time : Arrays.asList("CARTOES", "EMPRESTIMOS", "OUTROS_ASSUNTOS")) {
            filas.put(time, 0);
            atendentes.put(time, new ArrayList<>());
            atendimentosEmAndamento.put(time, new ArrayList<>());
        }
    }

    @PostMapping("/atendente")
    public ResponseEntity<?> adicionarAtendente(@RequestBody Map<String, String> payload) {
        String nome = payload.get("nome");
        String time = payload.get("time");
        
        Map<String, Object> atendente = new HashMap<>();
        atendente.put("id", nextId++);
        atendente.put("nome", nome);
        atendente.put("time", time);
        atendente.put("atendimentosAtuais", 0);
        
        atendentes.get(time).add(atendente);
        distribuirAtendimentos(time);
        
        return ResponseEntity.ok(atendente);
    }

    @PostMapping("/solicitacao")
    public ResponseEntity<?> criarSolicitacao(@RequestBody Map<String, String> payload) {
        String assunto = payload.get("assunto");
        String time = mapAssuntoParaTime(assunto);
        
        Map<String, Object> solicitacao = new HashMap<>();
        solicitacao.put("id", nextId++);
        solicitacao.put("assunto", assunto);
        solicitacao.put("descricao", payload.get("descricao"));
        solicitacao.put("status", "AGUARDANDO");
        
        filas.put(time, filas.get(time) + 1);
        distribuirAtendimentos(time);
        
        return ResponseEntity.ok(solicitacao);
    }

    private void distribuirAtendimentos(String time) {
        if (filas.get(time) <= 0) return;

        List<Map<String, Object>> atendentesDoTime = atendentes.get(time);
        for (Map<String, Object> atendente : atendentesDoTime) {
            // Primeiro, conta quantos atendimentos o atendente já tem
            int atendenteId = (int) atendente.get("id");
            int atendimentosAtuais = contarAtendimentosAtivos(time, atendenteId);
            
            // Atualiza o contador no objeto do atendente
            atendente.put("atendimentosAtuais", atendimentosAtuais);
            
            // Distribui novos atendimentos se houver capacidade
            while (atendimentosAtuais < 3 && filas.get(time) > 0) {
                // Atribui novo atendimento
                Map<String, Object> atendimento = new HashMap<>();
                atendimento.put("id", nextId++);
                atendimento.put("atendenteId", atendenteId);
                atendimento.put("status", "EM_ATENDIMENTO");
                
                atendimentosEmAndamento.get(time).add(atendimento);
                atendimentosAtuais++;
                filas.put(time, filas.get(time) - 1);
                
                // Atualiza o contador no objeto do atendente
                atendente.put("atendimentosAtuais", atendimentosAtuais);
            }
        }
    }

    private int contarAtendimentosAtivos(String time, int atendenteId) {
        return (int) atendimentosEmAndamento.get(time)
            .stream()
            .filter(atendimento -> atendimento.get("atendenteId").equals(atendenteId))
            .count();
    }

    @GetMapping("/fila/{time}")
    public ResponseEntity<Integer> getTamanhoFila(@PathVariable String time) {
        return ResponseEntity.ok(filas.getOrDefault(time, 0));
    }

    @GetMapping("/atendentes/{time}")
    public ResponseEntity<?> getAtendentes(@PathVariable String time) {
        return ResponseEntity.ok(atendentes.getOrDefault(time, new ArrayList<>()));
    }

    private String mapAssuntoParaTime(String assunto) {
        return switch (assunto) {
            case "PROBLEMAS_CARTAO" -> "CARTOES";
            case "CONTRATACAO_EMPRESTIMO" -> "EMPRESTIMOS";
            default -> "OUTROS_ASSUNTOS";
        };
    }

    // Adicionar endpoint para finalizar atendimento
    @PostMapping("/atendimento/{id}/finalizar")
    public ResponseEntity<?> finalizarAtendimento(@PathVariable int id) {
        for (String time : atendimentosEmAndamento.keySet()) {
            List<Map<String, Object>> atendimentos = atendimentosEmAndamento.get(time);
            Optional<Map<String, Object>> atendimento = atendimentos.stream()
                .filter(a -> a.get("id").equals(id))
                .findFirst();
                
            if (atendimento.isPresent()) {
                Map<String, Object> atend = atendimento.get();
                atend.put("status", "CONCLUIDO");
                
                // Atualiza contador do atendente
                int atendenteId = (int) atend.get("atendenteId");
                atendentes.get(time).stream()
                    .filter(a -> a.get("id").equals(atendenteId))
                    .findFirst()
                    .ifPresent(atendente -> {
                        int novosAtendimentos = contarAtendimentosAtivos(time, atendenteId);
                        atendente.put("atendimentosAtuais", novosAtendimentos);
                    });
                
                // Tenta distribuir atendimentos em fila
                distribuirAtendimentos(time);
                
                return ResponseEntity.ok(atend);
            }
        }
        
        return ResponseEntity.notFound().build();
    }
} 