CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Insert categories
INSERT INTO categories (name) VALUES ('animals');
INSERT INTO categories (name) VALUES ('vehicles');

CREATE TABLE languages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

-- Insert languages
INSERT INTO languages (name) VALUES ('English');
INSERT INTO languages (name) VALUES ('Finnish');

CREATE TABLE word_pairs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  language_1 INTEGER NOT NULL,
  language_1_word TEXT NOT NULL,
  language_2 INTEGER NOT NULL,
  language_2_word TEXT NOT NULL,
  category_id INTEGER NOT NULL,
  FOREIGN KEY (language_1) REFERENCES languages(id),
  FOREIGN KEY (language_2) REFERENCES languages(id)
  FOREIGN KEY (category_id) REFERENCES categories(id),
  UNIQUE (language_1, language_1_word, category_id),
  UNIQUE (language_2, language_2_word, category_id)
);

-- Insert word pairs
INSERT INTO word_pairs (language_1,  language_1_word, language_2,  language_2_word, category_id) VALUES (1, 'dog', 2, 'koira', 1);
INSERT INTO word_pairs (language_1,  language_1_word, language_2,  language_2_word, category_id) VALUES (1, 'cat', 2, 'kissa', 1);
INSERT INTO word_pairs (language_1,  language_1_word, language_2,  language_2_word, category_id) VALUES (1, 'car', 2, 'auto', 2);
INSERT INTO word_pairs (language_1,  language_1_word, language_2,  language_2_word, category_id) VALUES (1, 'bike', 2, 'pöyrä', 2);
INSERT INTO word_pairs (language_1,  language_1_word, language_2,  language_2_word, category_id) VALUES (1, 'house', 2, 'talo', 0);
INSERT INTO word_pairs (language_1,  language_1_word, language_2,  language_2_word, category_id) VALUES (1, 'beer', 2, 'olut', 0); 

