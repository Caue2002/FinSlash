import assert from 'node:assert/strict';
import test from 'node:test';
import { precisaEsclarecimento } from './index.js';

test('asks for context when the user describes a generic cost concern', () => {
    assert.equal(precisaEsclarecimento('Meu custo está muito alto'), true);
    assert.equal(precisaEsclarecimento('O painel está diferente'), true);
});

test('asks for context when a service is named but the problem is vague', () => {
    assert.equal(precisaEsclarecimento('O S3 está muito caro'), true);
    assert.equal(precisaEsclarecimento('S3'), true);
});

test('does not interrupt a specific question with a clarification prompt', () => {
    assert.equal(precisaEsclarecimento('Como reduzir custos do S3?'), false);
    assert.equal(precisaEsclarecimento('Como funciona o S3?'), false);
    assert.equal(precisaEsclarecimento('Como resolver erro 403 ao ler objetos no S3?'), false);
});
