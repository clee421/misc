-- WHERE
SELECT population FROM world
  WHERE name = 'Germany';

-- IN
SELECT name, population FROM world
  WHERE name IN ('Sweden', 'Norway', 'Denmark');

-- BETWEEN
SELECT name, area FROM world
  WHERE area BETWEEN 200000 AND 250000

-- LIKE / https://www.w3schools.com/sql/sql_like.asp
SELECT name FROM world
  WHERE name LIKE '%United%'

-- ROUND / https://sqlzoo.net/wiki/ROUND
SELECT name, ROUND(population/1000000, 2), ROUND(gdp/1000000000, 2)
  FROM world
  WHERE continent = 'South America'

-- LENGTH / https://sqlzoo.net/wiki/LENGTH
SELECT name, capital FROM world
 WHERE LENGTH(name) = LENGTH(capital)

-- LEFT / https://sqlzoo.net/wiki/LEFT
SELECT name, capital FROM world
  WHERE LEFT(name, 1) = LEFT(capital, 1) AND name <> capital

-- vowel selection
SELECT name
  FROM world
WHERE name LIKE '%a%' 
  AND name LIKE '%e%' 
  AND name LIKE '%i%' 
  AND name LIKE '%o%'
  AND name LIKE '%u%'
  AND name NOT LIKE '% %'

-- ORDER BY
SELECT winner, yr, subject
  FROM nobel
WHERE winner LIKE 'Sir%'
ORDER BY yr DESC, winner ASC

-- Sub-Query
SELECT name, continent
  FROM world
WHERE continent IN (
  SELECT continent FROM world WHERE name = 'Argentina' OR name = 'Australia')
ORDER By name ASC

-- CONCAT
SELECT name, CONCAT(
  ROUND(
    population / (
      SELECT population 
        FROM world 
      WHERE name = 'Germany'
    ) * 100,
    0
  ),
  '%'
)
  FROM world
WHERE continent = 'Europe'

-- ALL
SELECT name FROM world
WHERE gdp > ALL(
  SELECT gdp FROM world  
    WHERE gdp > 0 
      AND continent = 'Europe'
)

-- For loop style / labeling
SELECT continent, name FROM world a
WHERE name <= ALL(
  SELECT name FROM world b
    WHERE a.continent = b.continent
  ORDER BY name ASC
)

-- COUNT / Multi-SubQuery
SELECT name, continent, population FROM world a
WHERE (
  SELECT COUNT(name) FROM world c
  WHERE a.continent = c.continent
    AND population > 0
) = (
  SELECT COUNT(name) FROM world b
  WHERE a.continent = b.continent
    AND population <= 25000000
)

SELECT COUNT(name), COUNT(mobile) FROM teacher

-- https://sqlzoo.net/wiki/SELECT_within_SELECT_Tutorial #10 // VERY POORLY WORDED QUESTION
SELECT name, continent FROM world a
WHERE population > ALL(SELECT 3 * population FROM world b
  WHERE a.continent = b.continent
  AND b.population > 0
  AND a.name != b.name)

-- DISTINCT
SELECT DISTINCT continent FROM world

-- GROUP BY & HAVING
-- https://sqlzoo.net/wiki/Using_GROUP_BY_and_HAVING.

-- GROUP BY / multiple columns
SELECT id, mdate, COUNT(id)
  FROM game JOIN goal ON id = matchid
WHERE (team1 = 'POL' OR team2 = 'POL')
GROUP BY id, mdate


-- JOIN
SELECT player, teamid, stadium, mdate
  FROM game JOIN goal ON game.id = matchid
WHERE goal.teamid = 'GER'

-- CASE / https://sqlzoo.net/wiki/CASE
SELECT mdate,
  team1,
  SUM(CASE WHEN teamid = team1 THEN 1 ELSE 0 END) score1,
  team2,
  SUM(CASE WHEN teamid = team2 THEN 1 ELSE 0 END) score2
FROM game LEFT JOIN goal ON matchid = id
GROUP BY mdate, team1, team2
ORDER BY mdate, matchid, team1, team2

SELECT name,
  CASE
    WHEN dept = 1 OR dept = 2 THEN 'Sci'
    ELSE 'Art'
  END
FROM teacher

-- JOIN Types / http://www.sql-join.com/sql-join-types

-- Multi JOIN w/ SubQuery
SELECT movie.title, actor.name FROM casting
  JOIN movie ON movie.id = casting.movieid
  JOIN actor ON actor.id = casting.actorid
WHERE casting.ord = 1
  AND movie.id IN (
SELECT movie.id FROM casting
  JOIN movie ON movie.id = casting.movieid
  JOIN actor ON actor.id = casting.actorid
WHERE actor.name = 'Julie Andrews'
)

-- NULL / https://sqlzoo.net/wiki/Selecting_NULL_values.

-- COALESCE / https://sqlzoo.net/wiki/COALESCE
SELECT teacher.name, COALESCE (dept.name, 'None') FROM teacher
  LEFT JOIN dept ON teacher.dept = dept.id


