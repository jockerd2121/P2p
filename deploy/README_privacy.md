# Privacy & Tor (Opções para Testes)

Este arquivo documenta como testar o backend via Tor ou rotas anônimas em ambiente de desenvolvimento. IMPORTANTE: use apenas para fins de teste e com total consentimento dos participantes.

Avisos e riscos:
- Tor pode adicionar latência e alterar o comportamento de alguns serviços de rede.
- Alguns provedores bloqueiam tráfego oriundo de Tor e pode afetar resultados de integração.
- Nunca utilize Tor para ocultar atividade ilícita.

Exemplo básico (opcional):
- Rodar o serviço Tor localmente e expor o backend via torify/socat para fins de teste.

Recomendações:
- Faça testes isolados e documente claramente quando o tráfego foi roteado via Tor.
- Não automatize Tor em produção sem revisão jurídica/operacional.
