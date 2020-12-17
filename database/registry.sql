/*
Navicat MySQL Data Transfer

Source Server         : shi
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : mayzone

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-12-17 20:13:56
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `registry`
-- ----------------------------
DROP TABLE IF EXISTS `registry`;
CREATE TABLE `registry` (
  `sid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `tel` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of registry
-- ----------------------------
INSERT INTO `registry` VALUES ('11', '张三', '7c4a8d09ca3762af61e59520943dc26494f8941b', '59a4d1a5ab6');
INSERT INTO `registry` VALUES ('12', '李四', '7c4a8d09ca3762af61e59520943dc26494f8941b', '59a4d1a5ab6');
INSERT INTO `registry` VALUES ('13', 'zhangsan', '7c4a8d09ca3762af61e59520943dc26494f8941b', '59a4d1a5ab6');
