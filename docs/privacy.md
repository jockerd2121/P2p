# Privacy & Segurança — PoC Gateway P2P (Testnet / Sandbox)

Este documento descreve medidas de privacidade e configuração de anonimato com foco em proteção legítima de usuários e minimização de dados em um ambiente de prova de conceito (PoC). Todas as recomendações e código associados devem ser usados apenas em modo teste (testnet/sandbox) e com consentimento explícito dos participantes.

## Princípios

- Privacy by Design: coletar apenas o mínimo necessário; preferir tokenização ao armazenamento de dados sensíveis.
- Transparência e consentimento: todos os testadores devem aceitar um termo antes de participar.
- Retenção mínima: dados sensíveis não persistidos em disco; quando necessário, criptografar e documentar por quanto tempo são mantidos.
- Auditoria responsável: logs essenciais para investigação devem existir e ser protegidos — não apagar logs para ocultar ações.

## Implementações no repositório

Arquivos e funcionalidades adicionadas neste branch:

- backend/src/ephemeralStore.js — armazenamento efêmero com cifragem AES-256-GCM em memória. Usa `EPHEMERAL_KEY` (hex) se fornecido; caso contrário gera uma chave temporária por processo (não persistente).
- backend/src/walletProfiles.js — simulação de perfis de carteira e geração de endereços testnet (BTC/Monero) para fins educativos.
- backend/src/app.js — exige flag `consent: true` no payload de `/api/convert` para processar; não registra IP do cliente; usa o `ephemeralStore` criptografado.
- frontend/public/index.html — adiciona termo de consentimento prévio ao teste e link para esta documentação.
- frontend/src/app.js — envia `consent` no payload e impede envio se consentimento não for aceito.
- deploy/README_privacy.md — orientações sobre uso opcional via Tor em ambiente de testes (opção opt-in & riscos).

## Considerações técnicas

- Chave efêmera: se quiser persistir a chave entre reinícios para testes específicos, defina `EPHEMERAL_KEY` como um valor hex (64 caracteres) no ambiente. Em produção real, usar HSM ou secret manager.
- Tor: suportado apenas como opção de rede para testes; pode ajudar a reduzir exposição de metadados de rede, porém impacta latência e há implicações operacionais.
- Endereços testnet: o sistema gera endereços simulados para demonstração; NÃO utilizar em produção.

## Recomendações de conformidade

Antes de migrar qualquer fluxo para produção com conversões e cashout:

- Consulte jurídico para requisitos de KYC/AML aplicáveis.
- Não permita que usuários insiram PANs reais sem uso de provedores tokenização (Stripe/Adyen) em modo produção e com contratos.
- Mantenha logs necessários para auditoria e cooperação com autoridades, não apague trilhas de auditoria válidas.

## Processo de participação de testadores (sugestão segura)

1. O testador lê este documento e o termo de consentimento.
2. Testador usa cartões de teste ou tokens de sandbox fornecidos (ex.: Stripe test tokens).
3. Testador confirma consentimento via checkbox no frontend.
4. Backend processa apenas tokens/valores em modo testnet e grava apenas dados efêmeros criptografados.

## Contato

Para dúvidas sobre privacidade e conformidade, consultar o responsável técnico do projeto.
