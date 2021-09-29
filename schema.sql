DROP TABLE IF EXISTS sender;
CREATE TABLE IF NOT EXISTS sender(
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email VARCHAR NOT NULL,
  subject VARCHAR NOT NULL,
  message VARCHAR NOT NULL
);

INSERT INTO sender (name, email, subject, message) VALUES (
  'Nour Eddein',
  'noureddein@gmail.com',
  'Offer',
  'Check your email to see the offer'
);