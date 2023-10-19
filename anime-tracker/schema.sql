CREATE SCHEMA anime_schema;
CREATE SCHEMA AUTHORIZATION "wrightaq";

CREATE TABLE Titles(
  title_id integer PRIMARY KEY,
  title_name varchar,
  image_url varchar
);

CREATE TABLE Characters(
  character_id integer PRIMARY KEY,
  character_name varchar,
  image_url varchar
);

CREATE TABLE Voice_Actors(
  voice_actor_id integer PRIMARY KEY,
  title_id integer REFERENCES Titles(title_id),
  character_id integer REFERENCES Characters(character_id),
  voice_actor_name varchar,
  image_url varchar
);

-- TITLE
-- 123 - title_id
-- hunter x hunter

-- 987 -title_id
-- one piece

-- 567 - title_id
-- made up

-- CHARACTER
-- 234 - character_id
-- 123 - title_id
-- killua - character_name


-- 345 - character_id
-- 456 - title_id
-- luffy - character_name

-- 594 - character_id
-- 567 - title_id
-- goofy - character_name

-- 098 - character_id
-- 987 - title_id
-- sad - character_name

-- VOICE ACTOR
-- 567 - voice_actor_id
-- 234 - character_id
-- Kanako Mitsuhashi voice_actor

-- 876 - voice_actor_id
-- 456 - character_id
-- mayumi tanaka voice_actor

-- 485 - voice_actor_id
-- 567 - character_id
-- great person

-- 485 - voice_actor_id
-- 987 - character_id
-- great person