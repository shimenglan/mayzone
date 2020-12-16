/*
Navicat MySQL Data Transfer

Source Server         : shi
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : mayzone

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-12-16 20:19:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `register`
-- ----------------------------
DROP TABLE IF EXISTS `register`;
CREATE TABLE `register` (
  `sid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of register
-- ----------------------------
INSERT INTO `register` VALUES ('1', 'zhangsan', '7c4a8d09ca3762af61e59520943dc26494f8941b');
INSERT INTO `register` VALUES ('2', 'lisi', '7c4a8d09ca3762af61e59520943dc26494f8941b');
INSERT INTO `register` VALUES ('3', '张三', '7c4a8d09ca3762af61e59520943dc26494f8941b');
INSERT INTO `register` VALUES ('4', '李四', '7c4a8d09ca3762af61e59520943dc26494f8941b');
INSERT INTO `register` VALUES ('5', '王五', '7c4a8d09ca3762af61e59520943dc26494f8941b');
