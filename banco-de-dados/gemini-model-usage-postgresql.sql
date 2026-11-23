-- Contagem diaria de tokens consumidos por modelo Gemini (janela em UTC).
-- A API tambem cria esta tabela sob demanda (CREATE TABLE IF NOT EXISTS);
-- este arquivo serve de referencia e bootstrap manual.
CREATE TABLE IF NOT EXISTS gemini_model_usage (
    model TEXT NOT NULL,
    usage_date DATE NOT NULL,
    input_tokens BIGINT NOT NULL DEFAULT 0,
    output_tokens BIGINT NOT NULL DEFAULT 0,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    PRIMARY KEY (model, usage_date)
);
