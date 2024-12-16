package com.flowpay.atendimento.controller;

import com.flowpay.atendimento.model.Atendente;
import com.flowpay.atendimento.model.Solicitacao;
import com.flowpay.atendimento.model.TimeAtendimento;
import com.flowpay.atendimento.service.DistribuicaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/atendimento")
public class AtendimentoController {
    private final DistribuicaoService distribuicaoService;

    public AtendimentoController(DistribuicaoService distribuicaoService) {
        this.distribuicaoService = distribuicaoService;
    }

    @PostMapping("/solicitacao")
    public ResponseEntity<Void> novaSolicitacao(@RequestBody Solicitacao solicitacao) {
        distribuicaoService.distribuirSolicitacao(solicitacao);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/atendente")
    public ResponseEntity<Void> novoAtendente(@RequestBody Atendente atendente) {
        distribuicaoService.adicionarAtendente(atendente);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/fila/{time}")
    public ResponseEntity<Integer> consultarTamanhoFila(@PathVariable TimeAtendimento time) {
        return ResponseEntity.ok(distribuicaoService.getTamanhoFila(time));
    }

    @PostMapping("/atendimento/{atendenteId}/finalizar")
    public ResponseEntity<Void> finalizarAtendimento(@PathVariable String atendenteId) {
        distribuicaoService.finalizarAtendimento(atendenteId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/atendentes/{time}")
    public ResponseEntity<List<Atendente>> listarAtendentes(@PathVariable TimeAtendimento time) {
        return ResponseEntity.ok(distribuicaoService.getAtendentes(time));
    }
} 