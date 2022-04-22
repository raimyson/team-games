

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema teamgames
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema teamgames
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `teamgames` ;
USE `teamgames` ;

-- -----------------------------------------------------
-- Table `teamgames`.`room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamgames`.`room` ;

CREATE TABLE IF NOT EXISTS `teamgames`.`room` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `roomkey` VARCHAR(7) NULL,
  `visibility` INT NULL DEFAULT 0,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamgames`.`movingmotivators`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamgames`.`movingmotivators` ;

CREATE TABLE IF NOT EXISTS `teamgames`.`movingmotivators` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `card_curiosity` INT NULL DEFAULT 0,
  `card_curiosity_feel` INT NULL DEFAULT 0,
  `card_acceptance` INT NULL DEFAULT 1,
  `card_acceptance_feel` INT NULL DEFAULT 0,
  `card_power` INT NULL DEFAULT 2,
  `card_power_feel` INT NULL DEFAULT 0,
  `card_relatedness` INT NULL DEFAULT 3,
  `card_relatedness_feel` INT NULL DEFAULT 0,
  `card_goal` INT NULL DEFAULT 4,
  `card_goal_feel` INT NULL DEFAULT 0,
  `card_honor` INT NULL DEFAULT 5,
  `card_honor_feel` INT NULL DEFAULT 0,
  `card_mastery` INT NULL DEFAULT 6,
  `card_mastery_feel` INT NULL DEFAULT 0,
  `card_freedom` INT NULL DEFAULT 7,
  `card_freedom_feel` INT NULL DEFAULT 0,
  `card_order` INT NULL DEFAULT 8,
  `card_order_feel` INT NULL DEFAULT 0,
  `card_status` INT NULL DEFAULT 9,
  `card_status_feel` INT NULL DEFAULT 0,
  `roomid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_movingmotivators_room_idx` (`roomid` ASC) VISIBLE,
  CONSTRAINT `fk_movingmotivators_room`
    FOREIGN KEY (`roomid`)
    REFERENCES `teamgames`.`room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamgames`.`player`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamgames`.`player` ;

CREATE TABLE IF NOT EXISTS `teamgames`.`player` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `email` VARCHAR(255) NULL,
  `admin` INT NULL DEFAULT 0,
  `roomid` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_player_room1_idx` (`roomid` ASC) VISIBLE,
  CONSTRAINT `fk_player_room1`
    FOREIGN KEY (`roomid`)
    REFERENCES `teamgames`.`room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamgames`.`delegationpoker`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamgames`.`delegationpoker` ;

CREATE TABLE IF NOT EXISTS `teamgames`.`delegationpoker` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `decision` VARCHAR(255) NULL,
  `visibility` INT NULL,
  `room_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_delegationpoker_room1_idx` (`room_id` ASC) VISIBLE,
  CONSTRAINT `fk_delegationpoker_room1`
    FOREIGN KEY (`room_id`)
    REFERENCES `teamgames`.`room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `teamgames`.`delegationpoker_has_player`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `teamgames`.`delegationpoker_has_player` ;

CREATE TABLE IF NOT EXISTS `teamgames`.`delegationpoker_has_player` (
  `delegationpokerid` INT NOT NULL,
  `playerid` INT NOT NULL,
  `card` INT NULL,
  PRIMARY KEY (`delegationpokerid`, `playerid`),
  INDEX `fk_delegationpoker_has_player_player1_idx` (`playerid` ASC) VISIBLE,
  INDEX `fk_delegationpoker_has_player_delegationpoker1_idx` (`delegationpokerid` ASC) VISIBLE,
  CONSTRAINT `fk_delegationpoker_has_player_delegationpoker1`
    FOREIGN KEY (`delegationpokerid`)
    REFERENCES `teamgames`.`delegationpoker` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_delegationpoker_has_player_player1`
    FOREIGN KEY (`playerid`)
    REFERENCES `teamgames`.`player` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
