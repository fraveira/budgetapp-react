DROP TABLE IF EXISTS outgos;

CREATE TABLE outgos
(
    id SERIAL PRIMARY KEY,
    inbudget INT NOT NULL REFERENCES budgets(id),
    outgo1 INT,
    outgo2 INT,
    outgo3 INT,
    outgo4 INT,
    outgo5 INT,
    outgo6 INT,
    outgo7 INT,
    outgo8 INT
)