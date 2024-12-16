package com.flowpay.atendimento.model;

public enum TipoSolicitacao {
    PROBLEMAS_CARTAO("Problemas com cartão"),
    CONTRATACAO_EMPRESTIMO("Contratação de empréstimo"),
    OUTROS("Outros assuntos");

    private final String descricao;

    TipoSolicitacao(String descricao) {
        this.descricao = descricao;
    }

    public String getDescricao() {
        return descricao;
    }
} 