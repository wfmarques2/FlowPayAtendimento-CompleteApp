package com.flowpay.atendimento.service;

import com.flowpay.atendimento.model.Atendente;
import com.flowpay.atendimento.model.Solicitacao;
import com.flowpay.atendimento.model.TimeAtendimento;
import com.flowpay.atendimento.model.TipoSolicitacao;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class DistribuicaoServiceTest {
    private final DistribuicaoService service = new DistribuicaoService();

    @Test
    void deveDistribuirSolicitacaoParaTimeCorreto() {
        // Criar atendente
        Atendente atendente = new Atendente();
        atendente.setId("1");
        atendente.setNome("João");
        atendente.setTime(TimeAtendimento.CARTOES);
        service.adicionarAtendente(atendente);

        // Criar solicitação
        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setId("1");
        solicitacao.setTipo(TipoSolicitacao.PROBLEMAS_CARTAO);
        
        // Distribuir e verificar
        service.distribuirSolicitacao(solicitacao);
        assertTrue(solicitacao.isAtendida());
    }

    @Test
    void deveEnfileirarQuandoNaoHaAtendentesDisponiveis() {
        // Criar solicitação
        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setId("1");
        solicitacao.setTipo(TipoSolicitacao.PROBLEMAS_CARTAO);
        
        // Distribuir sem atendentes disponíveis
        service.distribuirSolicitacao(solicitacao);
        assertEquals(1, service.getTamanhoFila(TimeAtendimento.CARTOES));
    }

    @Test
    void deveRespeitarLimiteDeAtendimentosSimultaneos() {
        // Criar atendente
        Atendente atendente = new Atendente();
        atendente.setId("1");
        atendente.setTime(TimeAtendimento.CARTOES);
        service.adicionarAtendente(atendente);

        // Criar 4 solicitações
        for (int i = 0; i < 4; i++) {
            Solicitacao solicitacao = new Solicitacao();
            solicitacao.setId(String.valueOf(i));
            solicitacao.setTipo(TipoSolicitacao.PROBLEMAS_CARTAO);
            service.distribuirSolicitacao(solicitacao);
        }

        // Verificar se a quarta solicitação foi para a fila
        assertEquals(1, service.getTamanhoFila(TimeAtendimento.CARTOES));
    }

    @Test
    void deveRejeitarSolicitacaoComDadosInvalidos() {
        // Arrange
        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setId("1");
        solicitacao.setTipo(null); // Explicitamente definindo como null

        // Act & Assert
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, 
            () -> service.distribuirSolicitacao(solicitacao)
        );

        // Verificar a mensagem de erro
        assertEquals("Tipo da solicitação não pode ser nulo", exception.getMessage());
    }

    @Test
    void deveProcessarFilaQuandoAtendenteFinalizar() {
        // Criar atendente
        Atendente atendente = new Atendente();
        atendente.setId("1");
        atendente.setTime(TimeAtendimento.CARTOES);
        service.adicionarAtendente(atendente);

        // Criar 4 solicitações (3 em atendimento + 1 na fila)
        for (int i = 0; i < 4; i++) {
            Solicitacao solicitacao = new Solicitacao();
            solicitacao.setId(String.valueOf(i));
            solicitacao.setTipo(TipoSolicitacao.PROBLEMAS_CARTAO);
            service.distribuirSolicitacao(solicitacao);
        }

        // Verificar fila inicial
        assertEquals(1, service.getTamanhoFila(TimeAtendimento.CARTOES));

        // Finalizar um atendimento
        service.finalizarAtendimento("1");

        // Verificar se a fila foi processada
        assertEquals(0, service.getTamanhoFila(TimeAtendimento.CARTOES));
    }

    @Test
    void deveDistribuirCorretamenteParaOutrosAssuntos() {
        // Criar atendente
        Atendente atendente = new Atendente();
        atendente.setId("1");
        atendente.setTime(TimeAtendimento.OUTROS_ASSUNTOS);
        service.adicionarAtendente(atendente);

        // Criar solicitação de outro assunto
        Solicitacao solicitacao = new Solicitacao();
        solicitacao.setId("1");
        solicitacao.setTipo(TipoSolicitacao.OUTROS);
        
        // Distribuir e verificar
        service.distribuirSolicitacao(solicitacao);
        assertTrue(solicitacao.isAtendida());
        assertEquals(0, service.getTamanhoFila(TimeAtendimento.OUTROS_ASSUNTOS));
    }
} 