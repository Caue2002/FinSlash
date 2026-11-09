-- Execute como proprietario do banco, depois de criar as tabelas e o login finslash_api.
-- Conceda somente leitura nos roteiros, envio de feedback e manutenção do rate limit.
DO $$
BEGIN
    EXECUTE format('GRANT CONNECT ON DATABASE %I TO finslash_api', current_database());
END;
$$;

GRANT USAGE ON SCHEMA public TO finslash_api;

GRANT SELECT ON
    aws_services,
    cost_scenarios,
    scenario_steps,
    scenario_sources
TO finslash_api;

GRANT INSERT ON feedback_entries TO finslash_api;

GRANT INSERT, UPDATE, DELETE ON feedback_rate_limits TO finslash_api;
GRANT SELECT (address_hash, window_start, request_count, expires_at)
ON feedback_rate_limits TO finslash_api;
