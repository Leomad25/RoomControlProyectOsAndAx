CREATE SCHEMA IF NOT EXISTS `swich_controler_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;

CREATE TABLE IF NOT EXISTS `swich_controler_db`.`users` (
  `iduser` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `fullname` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `username` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

CREATE TABLE IF NOT EXISTS `swich_controler_db`.`devices` (
  `iddevice` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `namedevice` VARCHAR(255) NULL,
  `optionA` TINYINT NULL DEFAULT 1,
  `optionB` TINYINT NULL DEFAULT 1,
  `optionC` TINYINT NULL DEFAULT 1,
  `optionD` TINYINT NULL DEFAULT 1,
  `optionE` TINYINT NULL DEFAULT 1,
  `powerA` INT(3) NULL DEFAULT 100,
  `powerB` INT(3) NULL DEFAULT 100,
  `powerC` INT(3) NULL DEFAULT 100,
  `powerD` INT(3) NULL DEFAULT 100,
  `powerE` INT(3) NULL DEFAULT 100,
  PRIMARY KEY (`iddevice`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

CREATE TABLE IF NOT EXISTS `swich_controler_db`.`deveicecirculation` (
  `iddeveiceCirculation` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `mac` VARCHAR(100) NOT NULL,
  `ping` VARCHAR(5) NOT NULL,
  PRIMARY KEY (`iddeveiceCirculation`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;

CREATE TABLE IF NOT EXISTS `swich_controler_db`.`users-devices` (
  `iduserdevice` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(150) NOT NULL,
  `port` VARCHAR(10) NOT NULL,
  `iddevicecirculation` BIGINT(20) NOT NULL,
  `iduser` BIGINT(20) NOT NULL,
  `iddevice` BIGINT(20) NOT NULL,
  PRIMARY KEY (`iduserdevice`),
  INDEX `FK_device_idx` (`iddevice` ASC) VISIBLE,
  CONSTRAINT `FK_user`
    FOREIGN KEY (`iduser`)
    REFERENCES `swich_controler_db`.`users` (`iduser`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `FK_device`
    FOREIGN KEY (`iddevice`)
    REFERENCES `swich_controler_db`.`devices` (`iddevice`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
  CONSTRAINT `FK_devicecirculation`
    FOREIGN KEY (`iddevicecirculation`)
    REFERENCES `swich_controler_db`.`deveicecirculation` (`iddeveiceCirculation`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_bin;
