/* 

*/
CREATE SCHEMA IF NOT EXISTS vivekmouryadb1;

/*

*/
DROP TABLE IF EXISTS user;

/*

*/
CREATE TABLE IF NOT EXISTS user (
	`name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(70) NOT NULL,
  `mobileNumber` INT(10) NOT NULL,
  `dateOfBirth` VARCHAR(50) NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `mobileNumber_UNIQUE` (`mobileNumber` ASC) VISIBLE);
);