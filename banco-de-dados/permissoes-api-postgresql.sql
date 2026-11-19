-- Execute como proprietario do banco, depois de criar as tabelas e o login finslash_api.
-- Conceda somente leitura nos roteiros, envio de feedback e manutenção do rate limit.
SET client_encoding TO 'UTF8';
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

DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'extensions') THEN
        EXECUTE 'GRANT USAGE ON SCHEMA extensions TO finslash_api';
    END IF;
    IF to_regclass('public.scenario_embeddings') IS NOT NULL THEN
        EXECUTE 'GRANT SELECT, INSERT, UPDATE ON scenario_embeddings TO finslash_api';
    END IF;
    IF to_regclass('public.advisor_feedback_daily') IS NOT NULL THEN
        EXECUTE 'GRANT SELECT, INSERT, UPDATE, DELETE ON advisor_feedback_daily TO finslash_api';
    END IF;
END;
$$;
