package com.flowpay.atendimento.service;

import com.flowpay.atendimento.model.Atendente;
import com.flowpay.atendimento.model.Solicitacao;
import com.flowpay.atendimento.model.TimeAtendimento;
import com.flowpay.atendimento.model.TipoSolicitacao;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentLinkedQueue;

@Service
public class DistribuicaoService {
    private final Map<TimeAtendimento, List<Atendente>> atendentes = new HashMap<>();
    private final Map<TimeAtendimento, Queue<Solicitacao>> filasPorTime = new HashMap<>();

    public DistribuicaoService() {
        // Inicializa as filas para cada time
        for (TimeAtendimento time : TimeAtendimento.values()) {
            atendentes.put(time, new ArrayList<>());
            filasPorTime.put(time, new ConcurrentLinkedQueue<>());
        }
    }

    public void distribuirSolicitacao(Solicitacao solicitacao) {
        System.out.println("Tipo da solicitação: " + solicitacao.getTipo()); // Log temporário
        if (solicitacao.getTipo() == null) {
            throw new IllegalArgumentException("Tipo da solicitação não pode ser nulo");
        }
        TimeAtendimento timeDestino = determinarTimeAtendimento(solicitacao.getTipo());
        
        // Procura um atendente disponível
        Optional<Atendente> atendenteDisponivel = atendentes.get(timeDestino).stream()
                .filter(Atendente::podeAtenderMais)
                .findFirst();

        if (atendenteDisponivel.isPresent()) {
            atendenteDisponivel.get().iniciarAtendimento();
            solicitacao.setAtendida(true);
        } else {
            // Adiciona à fila do time correspondente
            filasPorTime.get(timeDestino).add(solicitacao);
        }
    }

    private TimeAtendimento determinarTimeAtendimento(TipoSolicitacao tipo) {
        if (tipo == null) {
            throw new IllegalArgumentException("Tipo da solicitação não pode ser nulo");
        }
        return switch (tipo) {
            case PROBLEMAS_CARTAO -> TimeAtendimento.CARTOES;
            case CONTRATACAO_EMPRESTIMO -> TimeAtendimento.EMPRESTIMOS;
            case OUTROS -> TimeAtendimento.OUTROS_ASSUNTOS;
        };
    }

    public void adicionarAtendente(Atendente atendente) {
        atendentes.get(atendente.getTime()).add(atendente);
        processarFilaAtendimento(atendente.getTime());
    }

    public void processarFilaAtendimento(TimeAtendimento time) {
        Queue<Solicitacao> fila = filasPorTime.get(time);
        List<Atendente> atendentesTime = atendentes.get(time);

        while (!fila.isEmpty()) {
            Optional<Atendente> atendenteDisponivel = atendentesTime.stream()
                    .filter(Atendente::podeAtenderMais)
                    .findFirst();

            if (atendenteDisponivel.isPresent()) {
                Solicitacao solicitacao = fila.poll();
                atendenteDisponivel.get().iniciarAtendimento();
                solicitacao.setAtendida(true);
            } else {
                break;
            }
        }
    }

    public int getTamanhoFila(TimeAtendimento time) {
        return filasPorTime.get(time).size();
    }

    public void finalizarAtendimento(String atendenteId) {
        atendentes.values().stream()
            .flatMap(List::stream)
            .filter(a -> a.getId().equals(atendenteId))
            .findFirst()
            .ifPresent(atendente -> {
                atendente.finalizarAtendimento();
                processarFilaAtendimento(atendente.getTime());
            });
    }

    public List<Atendente> getAtendentes(TimeAtendimento time) {
        return new ArrayList<>(atendentes.get(time));
    }
} 