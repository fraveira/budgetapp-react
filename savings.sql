DROP TABLE IF EXISTS savings
CASCADE;

CREATE TABLE savings
(
    id SERIAL PRIMARY KEY,
    owner INT NOT NULL REFERENCES users(id),
    savinsname TEXT,
    reached INT,
    goal INT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
)


INSERT INTO savings
    (owner, savingsname, reached, goal)
VALUES
    (3, 'Trip to Italy', 250, 750);

INSERT INTO savings
    (owner, savingsname, reached, goal)
VALUES
    (3, 'New Laptop', 50, 1100);