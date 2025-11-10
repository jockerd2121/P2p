# Proposta Técnica – Gateway P2P (Demo)

**SYNCARD – Prova de Conceito para Conversão Automática entre Cartão de Crédito (Dados de Teste) e Criptomoedas via Gateway P2P**

## Objetivo

Desenvolvimento de um protótipo para teste de sistemas de autorização e conversão automatizada de valores entre cartões de crédito (utilizando apenas dados gerados/fictícios para ambiente de QA) e criptomoedas (Monero e Bitcoin), visando validar a automação, escalabilidade e segurança de um gateway próprio.

## Premissas Técnicas

- Sem integração bancária real: Uso exclusivo de dados de cartão de teste.
- Autorização simulada ISO-8583.
- Conversão cripto simulada (testnet/stagenet).
- Armazenamento efêmero e ambiente reinicializável.
- Deploy via Docker e balanceamento com HAProxy.

## Funcionalidades

- Interface web minimalista para inserir dados de teste.
- Simulação de autorização e geração de TXIDs fictícios.
- Efemeridade: limpeza automática de dados.

## Observações

Este projeto é exclusivamente para fins de teste e demonstração. Nenhum dado real ou transação financeira será realizada.
