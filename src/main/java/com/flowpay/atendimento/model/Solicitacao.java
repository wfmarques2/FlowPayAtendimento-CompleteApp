package com.flowpay.atendimento.model;

public class Solicitacao {
    private String id;
    private String clienteNome;
    private TipoSolicitacao tipo;
    private String descricao;
    private boolean atendida;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getClienteNome() { return clienteNome; }
    public void setClienteNome(String clienteNome) { this.clienteNome = clienteNome; }
    public TipoSolicitacao getTipo() { return tipo; }
    public void setTipo(TipoSolicitacao tipo) { this.tipo = tipo; }
    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }
    public boolean isAtendida() { return atendida; }
    public void setAtendida(boolean atendida) { this.atendida = atendida; }
} 