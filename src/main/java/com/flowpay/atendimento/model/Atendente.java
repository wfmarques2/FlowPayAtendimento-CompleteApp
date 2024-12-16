package com.flowpay.atendimento.model;

public class Atendente {
    private String id;
    private String nome;
    private TimeAtendimento time;
    private int atendimentosSimultaneos;
    private static final int MAX_ATENDIMENTOS = 3;

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    public TimeAtendimento getTime() { return time; }
    public void setTime(TimeAtendimento time) { this.time = time; }
    public int getAtendimentosSimultaneos() { return atendimentosSimultaneos; }
    public void setAtendimentosSimultaneos(int atendimentosSimultaneos) { this.atendimentosSimultaneos = atendimentosSimultaneos; }

    public boolean podeAtenderMais() {
        return atendimentosSimultaneos < MAX_ATENDIMENTOS;
    }

    public void iniciarAtendimento() {
        if (!podeAtenderMais()) {
            throw new RuntimeException("Atendente já está com o máximo de atendimentos simultâneos");
        }
        atendimentosSimultaneos++;
    }

    public void finalizarAtendimento() {
        if (atendimentosSimultaneos > 0) {
            atendimentosSimultaneos--;
        }
    }
} 