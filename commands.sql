CREATE TABLE notes (
    username VARCHAR(255) references users(username),
    content VARCHAR(255) NOT NULL
);

INSERT INTO notes (username, content)
VALUES ('lesleyUsername', 'note content 1');
INSERT INTO notes (username, content)
VALUES ('lesleyUsername', 'note content 2');
INSERT INTO notes (username, content)
VALUES ('samUsername', 'note content 3');
INSERT INTO notes (username, content)
VALUES ('samUsername', 'note content 4');