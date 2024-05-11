/* 

*/
CREATE SCHEMA IF NOT EXISTS vivekmouryadb1;

/*

*/
DROP TABLE IF EXISTS user;

/*

*/
CREATE TABLE IF NOT EXISTS user (

 `id1` INT NOT NULL,
  `name` VARCHAR(60) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `mobileNumber` VARCHAR(60) NOT NULL,
  `dateOfBirth` DATE NOT NULL,
  PRIMARY KEY (`id1`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `mobileNumber_UNIQUE` (`mobileNumber` ASC) VISIBLE);
