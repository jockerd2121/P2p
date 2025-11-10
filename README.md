# Gateway P2P Demo – Prova de Conceito Seguro e Automatizado

PoC para automação do pipeline de conversão entre cartão de crédito (dados fictícios/teste, sem uso real) e criptomoedas (Bitcoin/Monero testnet), focando em segurança, efemeridade e testes para validação do gateway P2P.

## Funcionalidades
- Inserção de dados de cartão de crédito (simulados/gerados para QA).
- Autorização ISO-8583 simulada (sem adquirente verdadeiro).
- Conversão automática simulada para Monero e sequencialmente Bitcoin (ambos em testnet).
- Retorno de TXIDs simulados/testnet.
- Interface web minimalista.
- Ambiente efêmero, sem persistência de dados/logs, containers reiniciáveis.
- Implantação automatizada com Docker, escalabilidade por HAProxy.
- Segurança de rede reforçada (firewall, opcional uso de TOR nos testes).

## Uso Exclusivo
**Apenas para testes/demonstração. Nunca utilizar dados reais ou para finalidade comercial.**

---

## Como rodar (desenvolvimento local)

1. **Clone o repositório**
2. **Execute `docker-compose up` na raiz** para subir front + back + load balancer.
3. **Acesse a interface web** em [http://localhost:8080](http://localhost:8080).

---

## Documentação

Veja também [docs/proposta_gateway_p2p.md](docs/proposta_gateway_p2p.md) e [docs/privacy.md](docs/privacy.md) para detalhamento técnico e premissas.
