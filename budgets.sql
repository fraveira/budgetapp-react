DROP TABLE IF EXISTS budgets
CASCADE;

CREATE TABLE budgets
(
    id SERIAL PRIMARY KEY,
    owner INT NOT NULL REFERENCES users(id),
    budgetname TEXT,
    month TEXT,
    year INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)