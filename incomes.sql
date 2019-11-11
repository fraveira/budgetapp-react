DROP TABLE IF EXISTS incomes;

CREATE TABLE incomes
(
    id SERIAL PRIMARY KEY,
    inbudget INT NOT NULL REFERENCES budgets(id),
    income1 INT,
    income2 INT,
    income3 INT
)