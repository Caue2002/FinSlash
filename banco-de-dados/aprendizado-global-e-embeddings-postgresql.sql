-- Habilita recuperação semântica do catálogo e agregação segura de feedback.
BEGIN;

CREATE SCHEMA IF NOT EXISTS extensions;
CREATE EXTENSION IF NOT EXISTS vector WITH SCHEMA extensions;

CREATE TABLE IF NOT EXISTS scenario_embeddings (
    scenario_id BIGINT PRIMARY KEY
        REFERENCES cost_scenarios(id) ON DELETE CASCADE,
    content_hash TEXT NOT NULL CHECK (char_length(content_hash) = 64),
    embedding extensions.vector(768) NOT NULL,
    embedding_model TEXT NOT NULL DEFAULT 'gemini-embedding-001',
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS advisor_feedback_daily (
    signal_date DATE NOT NULL,
    rating TEXT NOT NULL CHECK (rating IN ('util', 'nao-util')),
    reason TEXT NOT NULL CHECK (
        reason IN ('none', 'incompleta', 'incorreta', 'confusa', 'fora_da_pergunta')
    ),
    signal_count INTEGER NOT NULL DEFAULT 1
        CHECK (signal_count BETWEEN 1 AND 1000000),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (signal_date, rating, reason),
    CHECK (
        (rating = 'util' AND reason = 'none')
        OR (rating = 'nao-util' AND reason <> 'none')
    )
);

COMMIT;
