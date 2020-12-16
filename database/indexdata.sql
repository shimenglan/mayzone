/*
Navicat MySQL Data Transfer

Source Server         : shi
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : mayzone

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2020-12-16 20:19:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `indexdata`
-- ----------------------------
DROP TABLE IF EXISTS `indexdata`;
CREATE TABLE `indexdata` (
  `sid` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `linkurl` varchar(200) DEFAULT NULL,
  `imgurl` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of indexdata
-- ----------------------------
INSERT INTO `indexdata` VALUES ('1', 'http://www.mayzone360.com/shop/item-4071.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-11.jpg?302');
INSERT INTO `indexdata` VALUES ('2', 'http://www.mayzone360.com/shop/item-12898.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-12.jpg?516');
INSERT INTO `indexdata` VALUES ('3', 'http://www.mayzone360.com/shop/item-5701.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-14.gif?755');
INSERT INTO `indexdata` VALUES ('4', 'http://www.mayzone360.com/shop/item-7366.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-21.jpg?116');
INSERT INTO `indexdata` VALUES ('5', 'http://www.mayzone360.com/shop/item-3288.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-24.jpg?691');
INSERT INTO `indexdata` VALUES ('6', 'http://www.mayzone360.com/shop/item-7335.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-31.jpg?681');
INSERT INTO `indexdata` VALUES ('7', 'http://www.mayzone360.com/shop/item-5086.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-32.jpg?904');
INSERT INTO `indexdata` VALUES ('8', 'http://www.mayzone360.com/shop/item-7950.html', 'http://www.mayzone360.com/data/upload/shop/editor/web-1-15-1-33.jpg?298');
