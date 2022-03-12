/*
SQLyog Community v11.52 (64 bit)
MySQL - 5.1.73 : Database - edwtestdb
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`edwtestdb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `edwtestdb`;

/*Table structure for table `d_fi` central_db */

DROP TABLE IF EXISTS `d_fi`;

CREATE TABLE `d_fi` (
  `FI_ID` int(4) NOT NULL,
  `FI_NM` varchar(255) NOT NULL,
  `FI_ALIAS` varchar(16) NOT NULL,
  `GEO_AREA_ID` int(6) NOT NULL,
  KEY `FI_ID` (`FI_ID`),
  KEY `FI_ID_2` (`FI_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `d_fi` */


/*Table structure for table `d_fi_branch` central_db */

DROP TABLE IF EXISTS `d_fi_branch`;

CREATE TABLE `d_fi_branch` (
  `FI_BRANCH_ID` int(14) NOT NULL,
  `FI_ID` int(4) NOT NULL,
  `BRANCH_NM` varchar(255) NOT NULL,
  `GEO_AREA_ID` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `d_fi_branch` */


/*Table structure for table `d_fi_class` central_db */

DROP TABLE IF EXISTS `d_fi_class`;

CREATE TABLE `d_fi_class` (
  `FI_CLASS_ID` int(4) NOT NULL,
  `FI_INST_TYPE` varchar(255) NOT NULL,
  `FI_CATEGORY` varchar(255) NOT NULL,
  `FI_CLUSTER` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `d_fi_class` */


/*Table structure for table `d_supervision_coa` central_db */

DROP TABLE IF EXISTS `d_supervision_coa`;

CREATE TABLE `d_supervision_coa` (
  `SUPERVISION_COA_ID` int(12) NOT NULL,
  `SUPERVISION_COA_LEVEL1` varchar(255) NOT NULL,
  `SUPERVISION_COA_LEVEL2` varchar(255) NOT NULL,
  `SUPERVISION_COA_LEVEL3` varchar(255) NOT NULL,
  `SUPERVISION_COA_LEVEL4` varchar(255) NOT NULL,
  `SUPERVISION_COA_LEVEL5` varchar(255) NOT NULL,
  `SUPERVISION_COA_LEVEL6` varchar(255) NOT NULL,
  `END_DATE` varchar(14) DEFAULT NULL,
  `USER_CODE` int(6) NOT NULL,
  `IDENTITY_CODE` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


/*Table structure for table `tbl_bank_branch` central_db keep */

DROP TABLE IF EXISTS `tbl_bank_branch`;

CREATE TABLE `tbl_bank_branch` (
  `FI_ID` int(4) NOT NULL,
  `FI_NM` varchar(60) NOT NULL,
  `FI_BRANCH_ID` bigint(10) NOT NULL,
  `BRANCH_NM` varchar(58) DEFAULT NULL,
  `DIVISION` varchar(10) DEFAULT NULL,
  `DISTRICT` varchar(16) DEFAULT NULL,
  `THANA` varchar(23) DEFAULT NULL,
  `FI_ALIAS` varchar(100) NOT NULL,
  `FI_CLASS_ID` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `tbl_bank_branch` */


/*Table structure for table `tbl_branch` */

DROP TABLE IF EXISTS `tbl_branch`;

CREATE TABLE `tbl_branch` (
  `FI_BRANCH_ID` int(10) NOT NULL,
  `BRANCH_NM` varchar(255) NOT NULL,
  `FI_ID` int(4) NOT NULL,
  `DIVISION` varchar(50) NOT NULL,
  `DISTRICT` varchar(100) NOT NULL,
  `THANA_UPAZILLA` varchar(150) NOT NULL,
  PRIMARY KEY (`FI_BRANCH_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_branch` */


/*Table structure for table `tbl_cat_loan_comp` */

-- DROP TABLE IF EXISTS `tbl_cat_loan_comp`;

-- CREATE TABLE `tbl_cat_loan_comp` (
--   `row_id` int(11) NOT NULL AUTO_INCREMENT,
--   `date_id` int(11) NOT NULL,
--   `cal_date` varchar(10) NOT NULL,
--   `fi_id` int(4) NOT NULL,
--   `branch_id` int(14) NOT NULL,
--   `branch_name` text NOT NULL,
--   `CLCC_H` varchar(20) NOT NULL,
--   `CLCC_P` varchar(20) NOT NULL,
--   `DemandLoan` varchar(20) NOT NULL,
--   `TimeLoan` varchar(20) NOT NULL,
--   `Sme` varchar(20) NOT NULL,
--   `AgriLoan` varchar(20) NOT NULL,
--   `GreenFinance` varchar(20) NOT NULL,
--   `Ltr` varchar(20) NOT NULL,
--   `Lim` varchar(20) NOT NULL,
--   `Ibp` varchar(20) NOT NULL,
--   `Pad` varchar(20) NOT NULL,
--   `Pcc` varchar(20) NOT NULL,
--   `Ecc` varchar(20) NOT NULL,
--   `TotalLoan` varchar(20) NOT NULL,
--   `UploadedBy` varchar(255) NOT NULL,
--   `UploadTime` datetime NOT NULL,
--   `MonthSequence` int(1) NOT NULL,
--   `Status` int(1) NOT NULL,
--   PRIMARY KEY (`row_id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=6542 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_cat_loan_comp` */


/*Table structure for table `tbl_cont_liab` */

-- DROP TABLE IF EXISTS `tbl_cont_liab`;

-- CREATE TABLE `tbl_cont_liab` (
--   `row_id` int(11) NOT NULL AUTO_INCREMENT,
--   `date_id` int(4) NOT NULL,
--   `cal_date` varchar(10) NOT NULL,
--   `fi_id` int(4) NOT NULL,
--   `branch_id` int(14) NOT NULL,
--   `branch_name` text NOT NULL,
--   `AgnstInlandBill` varchar(20) NOT NULL,
--   `AgnstForeignBill` varchar(20) NOT NULL,
--   `LcCommForeign` varchar(20) NOT NULL,
--   `LcCommLocal` varchar(20) NOT NULL,
--   `Guarantee` varchar(20) NOT NULL,
--   `TotalAccComm` varchar(20) NOT NULL,
--   `UploadedBy` varchar(255) NOT NULL,
--   `UploadTime` datetime NOT NULL,
--   `MonthSequence` int(1) NOT NULL,
--   `Status` int(1) NOT NULL,
--   PRIMARY KEY (`row_id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=6542 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_cont_liab` */


/*Table structure for table `tbl_npl_prov_comp` */

-- DROP TABLE IF EXISTS `tbl_npl_prov_comp`;

-- CREATE TABLE `tbl_npl_prov_comp` (
--   `row_id` int(11) NOT NULL AUTO_INCREMENT,
--   `date_id` int(11) NOT NULL,
--   `cal_date` varchar(10) NOT NULL,
--   `fi_id` int(4) NOT NULL,
--   `branch_id` int(14) NOT NULL,
--   `branch_name` text NOT NULL,
--   `totalLoan` varchar(20) NOT NULL,
--   `standard` varchar(20) NOT NULL,
--   `sma` varchar(20) NOT NULL,
--   `subStandard` varchar(20) NOT NULL,
--   `doubtful` varchar(20) NOT NULL,
--   `badLoss` varchar(20) NOT NULL,
--   `securityValue` varchar(20) NOT NULL,
--   `interestSuspense` varchar(20) NOT NULL,
--   `baseForProvision` varchar(20) NOT NULL,
--   `provReq` varchar(20) NOT NULL,
--   `provKept` varchar(20) NOT NULL,
--   `uploadedBy` varchar(255) NOT NULL,
--   `uploadTime` datetime NOT NULL,
--   `monthSeq` int(2) NOT NULL,
--   `status` int(1) NOT NULL,
--   PRIMARY KEY (`row_id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=59342 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_npl_prov_comp` */


/*Table structure for table `tbl_risk_key_branch` */

-- DROP TABLE IF EXISTS `tbl_risk_key_branch`;

-- CREATE TABLE `tbl_risk_key_branch` (
--   `row_id` int(11) NOT NULL AUTO_INCREMENT,
--   `date_id` int(11) NOT NULL,
--   `cal_date` varchar(10) NOT NULL,
--   `fi_id` int(4) NOT NULL,
--   `branch_id` int(14) NOT NULL,
--   `branch_name` text NOT NULL,
--   `LoanToAsset` varchar(20) NOT NULL,
--   `StressAssetTotalAsset` varchar(20) NOT NULL,
--   `NplRatio` varchar(20) NOT NULL,
--   `StressAssetTotalLoan` varchar(20) NOT NULL,
--   `DepositTotalLiab` varchar(20) NOT NULL,
--   `ProvisionTotalLoan` varchar(20) NOT NULL,
--   `RsdlTotalLoan` varchar(20) NOT NULL,
--   `TotalAcceptTotalLoan` varchar(20) NOT NULL,
--   `LtrToImport` varchar(20) NOT NULL,
--   `IbpToExport` varchar(20) NOT NULL,
--   `UploadedBy` varchar(255) NOT NULL,
--   `UploadTime` datetime NOT NULL,
--   `MonthSequence` int(1) NOT NULL,
--   `Status` int(1) NOT NULL,
--   PRIMARY KEY (`row_id`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=6542 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_risk_key_branch` */


/*Table structure for table `tbl_rit_features` */

DROP TABLE IF EXISTS `tbl_rit_features`;

CREATE TABLE `tbl_rit_features` (
  `rit_id` int(100) NOT NULL,
  `rit_name` varchar(200) NOT NULL,
  `rit_freq` varchar(500) NOT NULL,
  `rit_version` varchar(100) NOT NULL,
  `no_of_col` int(10) NOT NULL,
  `no_of_row` int(10) NOT NULL,
  `cut_off_days` varchar(155) NOT NULL,
  `dept` varchar(100) NOT NULL,
  `freq_full` varchar(20) NOT NULL,
  `status` varchar(200) NOT NULL,
  `validate` int(50) NOT NULL,
  PRIMARY KEY (`rit_id`),
  UNIQUE KEY `rit_id` (`rit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Data for the table `tbl_rit_features` */


/*Table structure for table `tbl_rit_sv` */

DROP TABLE IF EXISTS `tbl_rit_sv`;

CREATE TABLE `tbl_rit_sv` (
  `SL_NO` int(11) NOT NULL AUTO_INCREMENT,
  `RIT_NAME` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `FI_NM` varchar(255) DEFAULT NULL,
  `FI_ID` int(11) NOT NULL,
  `BRANCH_NM` varchar(255) DEFAULT NULL,
  `FI_BR_ID` int(11) NOT NULL,
  `RIT_ID` int(11) DEFAULT NULL,
  `USER_ID` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `FILE_NAME` varchar(255) CHARACTER SET latin1 NOT NULL,
  `RIT_FREQ` varchar(255) NOT NULL,
  `BASE_DATE` date NOT NULL,
  `PHONE_NO` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `PREPARED_BY` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `UPLOAD_TIME` timestamp NULL DEFAULT NULL,
  `STATUS` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `IP` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SL_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=959850 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_rit_sv` */


/*Table structure for table `tbl_rit_sv_history` */

DROP TABLE IF EXISTS `tbl_rit_sv_history`;

CREATE TABLE `tbl_rit_sv_history` (
  `SL_NO` int(11) NOT NULL AUTO_INCREMENT,
  `RIT_NAME` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `FI_NM` varchar(255) DEFAULT NULL,
  `FI_ID` int(11) NOT NULL,
  `BRANCH_NM` varchar(255) DEFAULT NULL,
  `FI_BR_ID` int(11) NOT NULL,
  `RIT_ID` int(11) DEFAULT NULL,
  `USER_ID` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `FILE_NAME` varchar(255) CHARACTER SET latin1 NOT NULL,
  `RIT_FREQ` varchar(255) NOT NULL,
  `BASE_DATE` date NOT NULL,
  `PHONE_NO` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `PREPARED_BY` varchar(200) CHARACTER SET latin1 DEFAULT NULL,
  `UPLOAD_TIME` timestamp NULL DEFAULT NULL,
  `STATUS` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `IP` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`SL_NO`)
) ENGINE=InnoDB AUTO_INCREMENT=196145 DEFAULT CHARSET=utf8;

/*Data for the table `tbl_rit_sv_history` */


/*Table structure for table `tbl_role` */

DROP TABLE IF EXISTS `tbl_role`;

CREATE TABLE `tbl_role` (
  `ROLE` int(20) NOT NULL AUTO_INCREMENT,
  `ROLE_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`ROLE`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=latin1;

/*Data for the table `tbl_role` */

insert  into `tbl_role`(`ROLE`,`ROLE_NAME`) values (100,'BB_ADMIN'),(101,'BB_END_USER'),(102,'Bnk_Br_end_user'),(103,'Bnk_Ho_end_user'),(104,'Bank_HO_Admin'),(105,'Bnk_MD');

/*Table structure for table `tbl_user` */

DROP TABLE IF EXISTS `tbl_user`;

CREATE TABLE `tbl_user` (
  `REPORT_TYPE_ID` varchar(20) NOT NULL,
  `USER_ID` varchar(100) NOT NULL,
  `PASSWORD` varchar(100) NOT NULL,
  `TEMP_PASSWORD` varchar(1000) NOT NULL,
  `FI_ID` int(11) NOT NULL,
  `FI_NM` varchar(255) NOT NULL,
  `FI_BR_ID` int(11) NOT NULL,
  `HO_ID` varchar(255) NOT NULL,
  `HO_NAME` varchar(200) DEFAULT NULL,
  `BRANCH_NM` varchar(255) DEFAULT NULL,
  `USER_NAME` varchar(300) NOT NULL,
  `ROLE` int(20) NOT NULL,
  `STATUS` varchar(20) DEFAULT NULL,
  `ONLINE` int(2) NOT NULL,
  `BLOCK` int(1) NOT NULL,
  `EMAIL` varchar(200) NOT NULL,
  `APPROVE_TIME` varchar(40) NOT NULL,
  `APPROVED_BY` varchar(100) NOT NULL,
  `PASS_RESET_TIME` varchar(40) NOT NULL,
  `LAST_PASS_UPDATED` varchar(40) NOT NULL,
  `FIRST_APPROVAL_ID` int(11) DEFAULT NULL,
  `SECOND_APPROVAL_ID` int(11) DEFAULT NULL,
  `CHANGE_APPROVAL_ID` varchar(20) DEFAULT NULL,
  `DESIGNATION` varchar(100) NOT NULL,
  `DEPT_SEC_DESK` varchar(100) DEFAULT NULL,
  `USER_TYPE_ID` varchar(11) NOT NULL,
  `CELL_NO` varchar(40) NOT NULL,
  `PHONE_NO` varchar(40) DEFAULT NULL,
  `SEC_QUES_ID` int(11) NOT NULL,
  `SEC_QUES_ANS` varchar(100) NOT NULL,
  `CHANGE_REQUESTER_ID` varchar(20) DEFAULT NULL,
  `CREATION_TIME` varchar(40) NOT NULL,
  `LAST_LOGIN` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `FAILURE_ATTEMPTS` int(11) DEFAULT NULL,
  `PASS_UPDATED_BY` varchar(20) NOT NULL,
  `RANDOM_STRING` varchar(20) NOT NULL,
  PRIMARY KEY (`USER_ID`),
  KEY `USER_NAME_2` (`USER_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*Table structure for table `login_attempts` */

DROP TABLE IF EXISTS `login_attempts`;

CREATE TABLE `login_attempts` (
  `serial` int(11) NOT NULL AUTO_INCREMENT,
  `ip` varchar(20) NOT NULL,
  `user_id` varchar(50) NOT NULL,
  `pass` varchar(50) NOT NULL,
  `time` datetime NOT NULL,
  PRIMARY KEY (`serial`)
) ENGINE=InnoDB AUTO_INCREMENT=175407 DEFAULT CHARSET=latin1;

/*Data for the table `login_attempts` */

/*Data for the table `tbl_user` */


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
