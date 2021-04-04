-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2021 at 12:28 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mygynic`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `DOB` varchar(255) DEFAULT NULL,
  `HouesNo` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Pincode` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `ProfileImage` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `Name`, `UserId`, `Role`, `Email`, `DOB`, `HouesNo`, `City`, `State`, `Pincode`, `Country`, `Gender`, `MobileNo`, `ProfileImage`, `IsActive`, `createdAt`, `updatedAt`) VALUES
(1, 'Rohini Jichkar', 'Rohini', 'admin', 'rohini@gmail.com', '13/04/1998', '1234455', 'pune', 'maharastra', '441168', 'india', 'female', '4557543567', NULL, 1, '2021-02-11 13:38:55', '2021-02-10 13:38:55');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `PatientId` varchar(255) DEFAULT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `AppointmentDate` varchar(255) DEFAULT NULL,
  `AppointmentTime` varchar(255) DEFAULT NULL,
  `BookedDate` varchar(255) DEFAULT NULL,
  `AppointmentType` varchar(255) DEFAULT NULL,
  `AppointmentChannel` varchar(255) DEFAULT NULL,
  `AppointmentStatus` varchar(255) DEFAULT NULL,
  `Patient_BP` varchar(255) DEFAULT NULL,
  `Patient_Weight` varchar(255) DEFAULT NULL,
  `Patient_LastPeriodDate` varchar(255) DEFAULT NULL,
  `ShortNote` varchar(255) DEFAULT NULL,
  `FollowupDate` varchar(255) DEFAULT NULL,
  `PrescriptionURL` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `Title`, `PatientId`, `GynicId`, `ClinicId`, `AppointmentDate`, `AppointmentTime`, `BookedDate`, `AppointmentType`, `AppointmentChannel`, `AppointmentStatus`, `Patient_BP`, `Patient_Weight`, `Patient_LastPeriodDate`, `ShortNote`, `FollowupDate`, `PrescriptionURL`, `createdBy`, `updatedBy`, `isActive`, `createdAt`, `updatedAt`) VALUES
(1, 'test', 'test', 'test', 'tess', 'test', 'test', 'test', 'tset', 'test', 'tsa', 'tse', 'dfa', 'dasf', 'sdaf', 'asdfasd', 'daf', 'asdfa', 'sdfads', 1, '2021-03-24 18:40:22', '2021-03-24 18:40:22');

-- --------------------------------------------------------

--
-- Table structure for table `bookappointments`
--

CREATE TABLE `bookappointments` (
  `id` int(11) NOT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `SlotId` varchar(255) DEFAULT NULL,
  `Slot` varchar(255) DEFAULT NULL,
  `Date` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `GynicId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `broadcast`
--

CREATE TABLE `broadcast` (
  `id` int(11) NOT NULL,
  `GynicId` varchar(255) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Discription` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `broadcasts`
--

CREATE TABLE `broadcasts` (
  `id` int(11) NOT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Discription` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `broadcasts`
--

INSERT INTO `broadcasts` (`id`, `GynicId`, `Title`, `Discription`, `createdAt`, `updatedAt`) VALUES
(5, 'Dr.BL8M', 'Gynic Message', 'Maintain social distancing', '2021-03-05 05:23:36', '2021-03-05 05:23:36'),
(6, 'Dr.ZP7X', 'Gynic Message', 'Please follow hospital rules and be keep silence in waiting area', '2021-03-05 05:25:45', '2021-03-05 05:25:45');

-- --------------------------------------------------------

--
-- Table structure for table `clinics`
--

CREATE TABLE `clinics` (
  `id` int(11) NOT NULL,
  `ClinicName` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `ClinicEmail` varchar(255) DEFAULT NULL,
  `ClinicAddress` varchar(255) DEFAULT NULL,
  `ClinicCity` varchar(255) DEFAULT NULL,
  `ClinicState` varchar(255) DEFAULT NULL,
  `ClinicPincode` varchar(255) DEFAULT NULL,
  `ClinicCountry` varchar(255) DEFAULT NULL,
  `ClinicGstNumber` varchar(255) DEFAULT NULL,
  `ClinicRegistrationNumber` varchar(255) DEFAULT NULL,
  `ClinicStartTime` varchar(255) DEFAULT NULL,
  `ClinicEndTime` varchar(255) DEFAULT NULL,
  `NoOfStaff` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `clinics`
--

INSERT INTO `clinics` (`id`, `ClinicName`, `ClinicId`, `ClinicEmail`, `ClinicAddress`, `ClinicCity`, `ClinicState`, `ClinicPincode`, `ClinicCountry`, `ClinicGstNumber`, `ClinicRegistrationNumber`, `ClinicStartTime`, `ClinicEndTime`, `NoOfStaff`, `IsActive`, `createdAt`, `updatedAt`) VALUES
(9, 'Lotus Clinic ', 'LotusLG8L', 'lotusclinic@gmail.com', '#Shop No.7, Horizon at Wakad., Landmark: Behind Crystal Height Society', 'Pune', 'Maharastra', '444106', 'India', 'W1122', '76897', '10:00 AM ', '08:30 PM', '2', 1, '2021-03-03 09:22:36', '2021-03-03 09:22:36'),
(10, 'Vatsalya Women\'s Clinic', 'VatsalyaJ45C', 'gynaecologistpune.co.in', 'Office No.45, 1st Floor B Wing Westend Plaza, Nagras Rd, near Concentrix', 'Pune', 'Maharastra', '444106', 'India', 'GST123P6', '57643', '10:00 AM ', '11:00 PM', '3', 1, '2021-03-03 09:29:41', '2021-03-03 09:29:41'),
(11, 'rohini clinic', 'rohiniGM33', 'rohiniclinic@gmail.com', 'pune', 'pune', 'maharastra', '411007', 'india', '567876', '789678', '10:00 AM', '09:00 PM', '1', 1, '2021-03-06 11:04:51', '2021-03-06 11:04:51'),
(12, 'test', 'testFLAD', 'test@gmail.com', 'pune', 'pune', 'maharastra', '411007', 'india', '567876', '789678', '10:00 AM', '09:00 PM', '1', 1, '2021-03-06 11:20:18', '2021-03-06 11:20:18');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `HeadDoctor` tinyint(1) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `Education` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Pincode` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `DOB` varchar(255) DEFAULT NULL,
  `Experience` varchar(255) DEFAULT NULL,
  `ProfileImage` varchar(255) DEFAULT NULL,
  `ClinicName` varchar(255) DEFAULT NULL,
  `ClinicAddress` varchar(255) DEFAULT NULL,
  `ClinicGstNumber` varchar(255) DEFAULT NULL,
  `ClinicRegistrationNumber` varchar(255) DEFAULT NULL,
  `ClinicTime` varchar(255) DEFAULT NULL,
  `StartDate` varchar(255) DEFAULT NULL,
  `EndDate` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `ReferedBy` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `Name`, `UserId`, `ClinicId`, `HeadDoctor`, `Role`, `Education`, `Email`, `Address`, `City`, `State`, `Pincode`, `Country`, `Gender`, `MobileNo`, `DOB`, `Experience`, `ProfileImage`, `ClinicName`, `ClinicAddress`, `ClinicGstNumber`, `ClinicRegistrationNumber`, `ClinicTime`, `StartDate`, `EndDate`, `Type`, `ReferedBy`, `IsActive`, `createdAt`, `updatedAt`) VALUES
(13, 'Dr. Vaishali Umap', 'Dr.PCQ8', 'LotusLG8L', 1, 'DOCTOR', 'MBBS, DGO', 'vaishali@gmail.com', 'City Avenue, N-Wing, Wakad', 'Pune', 'Maharastra', '444106', 'India', 'FEMALE', '9865786432', '1996/04/12', '23 Years', NULL, 'Lotus Clinic ', '#Shop No.7, Horizon at Wakad., Landmark: Behind Crystal Height Society', 'W1122', '76897', '10:00 AM - 08:30 PM', '2009/02/10', '2022/11/10', 'Gynecologist, Obstetrician, Infertility Specialist', 'Lotus Clinic', 1, '2021-03-03 09:22:36', '2021-03-03 09:22:36'),
(14, 'Dr. Manisha Munemane', 'Dr.BL8M', 'VatsalyaJ45C', 1, 'DOCTOR', 'MBBS, MD', 'gynaecologistpune@gmail.com', 'office-M-118 1st Floor City Avenue, Serial Number 131(P) 1, Landmark: Near Jaguar car Showroom', 'Pune', 'Maharastra', '444106', 'India', 'FEMALE', '9552504246', '1987/07/25', '26 Years', NULL, 'Vatsalya Women\'s Clinic', 'Office No.45, 1st Floor B Wing Westend Plaza, Nagras Rd, near Concentrix', 'GST123P6', '57643', '10:00 AM - 11:00 PM', '2005/03/11', '2022/11/10', 'Gynecologist, Obstetrician, Infertility Specialist', 'Vatsalya Women\'s World', 1, '2021-03-03 09:29:41', '2021-03-03 09:29:41'),
(16, 'Dr. Jyoti Dekate', 'Dr.ZP7X', 'LotusLG8L', NULL, 'DOCTOR', 'MBBS, MS', 'jyoti.dekate@gmail.com', 'Nisarg Deep 1, Kaspate Wasti, Chatrapati Chowk, Landmark: Opposite Wind Ward Society', 'Pune', 'Maharastra', '441106', 'India', 'Female', '9765498767', '1999/09/13', '19', NULL, 'Lotus Clinic ', '#Shop No.7, Horizon at Wakad., Landmark: Behind Crystal Height Society', 'W1122', '76897', '10:00 PM - 08:30 PM', '2020/04/19', '2021/09/22', 'Gynecologist, Obstetrician, Infertility Specialist', 'Lotus Clinic ', 1, '2021-03-03 09:42:06', '2021-03-03 09:42:06'),
(17, 'rohini', 'rohini90T5', 'rohiniGM33', 1, 'DOCTOR', 'mca', 'rohini@gmail.com', 'amravati', 'amravati', 'maharstra', '411007', 'india', 'FEMALE', '9876898767', '1980-05-02', '1', NULL, 'rohini clinic', 'pune', '567876', '789678', '10:00 AM - 09:00 PM', '2000-03-15', '2023-06-12', 'abc', 'rohini clinic', 1, '2021-03-06 11:04:51', '2021-03-06 11:04:51'),
(18, 'test', 'testBFZ6', 'testFLAD', 1, 'DOCTOR', 'mca', 'test@gmail.com', 'amravati', 'amravati', 'maharstra', '411007', 'india', 'FEMALE', '8976545678', '1980-05-02', '1', NULL, 'test', 'pune', '567876', '789678', '10:00 AM - 09:00 PM', '2000-03-15', '2023-06-12', 'abc', 'test', 1, '2021-03-06 11:20:18', '2021-03-06 11:20:18');

-- --------------------------------------------------------

--
-- Table structure for table `fosters`
--

CREATE TABLE `fosters` (
  `id` int(11) NOT NULL,
  `VetId` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Phone` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Time` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fosters`
--

INSERT INTO `fosters` (`id`, `VetId`, `Name`, `Email`, `Phone`, `Address`, `Time`, `Image`, `createdAt`, `updatedAt`) VALUES
(1, '1', 'Test', 'abc@gmail.com', '111111111', 'test', 'testtime', 'testimg', '2021-01-12 12:44:07', '2021-01-12 12:44:07');

-- --------------------------------------------------------

--
-- Table structure for table `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `LastLogin` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logins`
--

INSERT INTO `logins` (`id`, `Email`, `UserId`, `ClinicId`, `Name`, `MobileNo`, `Role`, `Password`, `IsActive`, `createdAt`, `updatedAt`, `LastLogin`) VALUES
(32, 'vaishali@gmail.com', 'Dr.YCS9', 'LotusTOG8', 'Dr. Vaishali Umap', '9865786432', 'DOCTOR', 'r4iCd', 1, '2021-03-03 09:22:36', '2021-03-03 09:22:36', NULL),
(33, 'gynaecologistpune@gmail.com', 'Dr.IRKG', 'VatsalyaE6Z5', 'Dr. Manisha Munemane', '9552504246', 'DOCTOR', 'oaCQp', 1, '2021-03-03 09:29:41', '2021-03-03 09:29:41', NULL),
(35, 'jyoti.dekate@gmail.com', 'Dr.ZP7X', 'LotusLG8L', 'Dr. Jyoti Dekate', '9765498767', 'DOCTOR', 'T212i', 1, '2021-03-03 09:42:06', '2021-03-03 09:42:06', NULL),
(40, 'chaitali.umak@gmail.com', 'ChaitaliDN8W', 'VatsalyaJ45C', 'Chaitali Umak', '8767567876', 'PATIENT', 'VzjYc', 1, '2021-03-05 07:01:28', '2021-03-05 07:01:28', NULL),
(41, 'pranali.jagtap09@gmail.com', 'Pranali4MF7', 'VatsalyaJ45C', 'Pranali Jagtap', '9422158128', 'PATIENT', 'QAJmE', 1, '2021-03-05 07:05:37', '2021-03-05 07:05:37', NULL),
(42, 'pohokarsadhana1@gmail.com', 'SadhanaCS2A', 'LotusLG8L', 'Sadhana Pohokar', '8766922134', 'PATIENT', 'pfzgR', 1, '2021-03-05 07:07:39', '2021-03-05 07:07:39', NULL),
(43, 'kalpnaraut@gmail.com', 'KalpnaOLE6', 'LotusLG8L', 'Kalpna Raut', '7543287690', 'PATIENT', 'n6m6f', 1, '2021-03-05 07:09:56', '2021-03-05 07:09:56', NULL),
(44, 'pallavisable@gmail.com', 'Pallavi58LE', 'LotusLG8L', 'Pallavi Sable', '9834729601', 'PATIENT', 'utfmP', 1, '2021-03-05 07:14:11', '2021-03-05 07:14:11', NULL),
(45, 'rohini@gmail.com', 'rohini90T5', 'rohiniGM33', 'rohini', '9876898767', 'DOCTOR', '2zieD', 1, '2021-03-06 11:04:51', '2021-03-06 11:04:51', NULL),
(46, 'test@gmail.com', 'testBFZ6', 'testFLAD', 'test', '8976545678', 'DOCTOR', 'sphHF', 1, '2021-03-06 11:20:18', '2021-03-06 11:20:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `loyalties`
--

CREATE TABLE `loyalties` (
  `id` int(11) NOT NULL,
  `VetId` varchar(255) DEFAULT NULL,
  `Discription` varchar(255) DEFAULT NULL,
  `Image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `mattings`
--

CREATE TABLE `mattings` (
  `id` int(11) NOT NULL,
  `PetId` varchar(255) DEFAULT NULL,
  `VetId` varchar(255) DEFAULT NULL,
  `Status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `patientdetails`
--

CREATE TABLE `patientdetails` (
  `id` int(11) NOT NULL,
  `PatientId` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `DOB` varchar(255) DEFAULT NULL,
  `Age` varchar(255) DEFAULT NULL,
  `Height` varchar(255) DEFAULT NULL,
  `Weight` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Pincode` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `isPregant` varchar(255) DEFAULT NULL,
  `LastPeriodDate` varchar(255) DEFAULT NULL,
  `PregantDate` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `GynicId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patientdetails`
--

INSERT INTO `patientdetails` (`id`, `PatientId`, `UserId`, `ClinicId`, `Name`, `Email`, `MobileNo`, `DOB`, `Age`, `Height`, `Weight`, `Address`, `City`, `State`, `Pincode`, `Country`, `isPregant`, `LastPeriodDate`, `PregantDate`, `isActive`, `createdAt`, `updatedAt`, `GynicId`) VALUES
(13, 'ChaitaliQ3GO', 'ChaitaliDN8W', 'VatsalyaJ45C', 'Chaitali Umak', 'chaitali.umak@gmail.com', '8767567876', '1992/08/05', '28', '5.4', '60', 'Dastur Nagar', 'Amravati', 'Maharastra', '444606', 'India', 'Yes', '2020-09-09', '2020-11-09', 1, '2021-03-05 07:01:28', '2021-03-05 07:01:28', NULL),
(14, 'PranaliQHQF', 'Pranali4MF7', 'VatsalyaJ45C', 'Pranali Jagtap', 'pranali.jagtap09@gmail.com', '9422158128', '1992/09/09', '29', '5.2', '66', 'Karve Nagar', 'Pune', 'Maharastra', '411007', 'India', 'Yes', '2021-01-12', '2021-03-01', 1, '2021-03-05 07:05:37', '2021-03-05 07:05:37', NULL),
(15, 'SadhanaYGBM', 'SadhanaCS2A', 'LotusLG8L', 'Sadhana Pohokar', 'pohokarsadhana1@gmail.com', '8766922134', '1990/02/11', '30', '5.5', '62', 'Yashoda Nagar, No. 1', 'Amravati', 'Maharastra', '444606', 'India', 'No', '2021-02-11', '', 1, '2021-03-05 07:07:39', '2021-03-05 07:07:39', NULL),
(16, 'KalpnaMASS', 'KalpnaOLE6', 'LotusLG8L', 'Kalpna Raut', 'kalpnaraut@gmail.com', '7543287690', '1996-02-11', '26', '5.2', '62', 'Near Rajkamal Police Station, Deshmukh Wadi', 'Amravati', 'Maharastra', '444607', 'India', 'YEs', '2021-02-11', '2021-03-02', 1, '2021-03-05 07:09:56', '2021-03-05 07:09:56', NULL),
(17, 'PallaviQDQY', 'Pallavi58LE', 'LotusLG8L', 'Pallavi Sable', 'pallavisable@gmail.com', '9834729601', '1992-04-28', '28', '5.6', '57', 'Krushna Nagar, Near Kulkarni Hospital', 'Mumbai', 'Maharastra', '441012', 'India', 'No', '2021-02-09', '', 1, '2021-03-05 07:14:11', '2021-03-05 07:14:11', NULL),
(18, 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 'test', 1, '2021-03-31 16:15:54', '2021-03-31 16:15:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `petdetails`
--

CREATE TABLE `petdetails` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `DOB` varchar(255) DEFAULT NULL,
  `Age` varchar(255) DEFAULT NULL,
  `Hight` varchar(255) DEFAULT NULL,
  `Weight` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Pincode` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pets`
--

CREATE TABLE `pets` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `ProfileImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pets`
--

INSERT INTO `pets` (`id`, `Name`, `UserId`, `GynicId`, `Role`, `Email`, `Address`, `Gender`, `MobileNo`, `ProfileImage`, `createdAt`, `updatedAt`) VALUES
(1, 'Pranali Jagtap', 'LV7V', 'PJ', 'PATIENT', 'pranali.jagtap3@gmail.com', 'Pune', 'Female', '7865896754', NULL, '2021-02-26 08:54:50', '2021-02-26 08:54:50'),
(2, 'Pranali Jagtap', 'QTKW', 'PJ', 'PATIENT', 'pranali.jagtap9@gmail.com', 'Pune', 'Female', '7865896754', NULL, '2021-02-26 08:59:20', '2021-02-26 08:59:20');

-- --------------------------------------------------------

--
-- Table structure for table `productcategories`
--

CREATE TABLE `productcategories` (
  `id` int(11) NOT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `VetId` varchar(255) DEFAULT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `Price` varchar(255) DEFAULT NULL,
  `Discount` varchar(255) DEFAULT NULL,
  `DiscountPrice` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `ProductImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `register_users`
--

CREATE TABLE `register_users` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `ProfileImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `servicecategories`
--

CREATE TABLE `servicecategories` (
  `id` int(11) NOT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `ServiceName` varchar(255) DEFAULT NULL,
  `Category` varchar(255) DEFAULT NULL,
  `Price` varchar(255) DEFAULT NULL,
  `Discount` varchar(255) DEFAULT NULL,
  `DiscountPrice` varchar(255) DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `ServiceImage` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `GynicId`, `ClinicId`, `ServiceName`, `Category`, `Price`, `Discount`, `DiscountPrice`, `Description`, `ServiceImage`, `createdAt`, `updatedAt`) VALUES
(2, 'Dr.XBYI', '', 'Health Checkup', 'Health Services', '550', '20', '440', 'Complete Blood Count', NULL, '2021-03-02 12:24:08', '2021-03-02 12:31:56'),
(3, 'Dr.XBYI', '', 'Health Checkup', 'Health Services', '550', '10', '495', 'Complete Blood Count', NULL, '2021-03-02 12:27:25', '2021-03-02 12:27:25');

-- --------------------------------------------------------

--
-- Table structure for table `setappointments`
--

CREATE TABLE `setappointments` (
  `id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `AppointmentType` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `PatientId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `AppointmentDate` varchar(255) DEFAULT NULL,
  `AppointmentTime` varchar(255) DEFAULT NULL,
  `BookedDate` varchar(255) DEFAULT NULL,
  `AppointmentChannel` varchar(255) DEFAULT NULL,
  `AppointmentStatus` varchar(255) DEFAULT NULL,
  `Patient_BP` varchar(255) DEFAULT NULL,
  `Patient_Weight` varchar(255) DEFAULT NULL,
  `Patient_LastPeriodDate` varchar(255) DEFAULT NULL,
  `ShortNote` varchar(255) DEFAULT NULL,
  `FollowupDate` varchar(255) DEFAULT NULL,
  `PrescriptionURL` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `createdDate` varchar(255) DEFAULT NULL,
  `updatedDate` varchar(255) DEFAULT NULL,
  `isActive` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `slots`
--

CREATE TABLE `slots` (
  `id` int(11) NOT NULL,
  `Slots` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `tips`
--

CREATE TABLE `tips` (
  `id` int(11) NOT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `Discription` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tips`
--

INSERT INTO `tips` (`id`, `GynicId`, `ClinicId`, `Title`, `Discription`, `createdAt`, `updatedAt`) VALUES
(3, 'Dr.XBYI', '', 'Exercise regularly, Track your weight gain (normal weight gain is 25-35 pounds)', 'PregnancyTips', '2021-03-02 11:27:02', '2021-03-02 11:27:02'),
(4, 'Dr.XBYI', '', 'Keep Good Hygiene Basic', 'Health Tips', '2021-03-02 11:32:25', '2021-03-02 11:32:25');

-- --------------------------------------------------------

--
-- Table structure for table `todaysappointments`
--

CREATE TABLE `todaysappointments` (
  `id` int(11) NOT NULL,
  `Title` varchar(255) DEFAULT NULL,
  `PatientId` varchar(255) DEFAULT NULL,
  `GynicId` varchar(255) DEFAULT NULL,
  `ClinicId` varchar(255) DEFAULT NULL,
  `AppointmentDate` varchar(255) DEFAULT NULL,
  `AppointmentTime` varchar(255) DEFAULT NULL,
  `BookedDate` varchar(255) DEFAULT NULL,
  `AppointmentType` varchar(255) DEFAULT NULL,
  `AppointmentChannel` varchar(255) DEFAULT NULL,
  `AppointmentStatus` varchar(255) DEFAULT NULL,
  `Patient_BP` varchar(255) DEFAULT NULL,
  `Patient_Weight` varchar(255) DEFAULT NULL,
  `Patient_LastPeriodDate` varchar(255) DEFAULT NULL,
  `ShortNote` varchar(255) DEFAULT NULL,
  `FollowupDate` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `DOB` varchar(255) DEFAULT NULL,
  `Age` varchar(255) DEFAULT NULL,
  `Weight` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Pincode` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `isPregant` varchar(255) DEFAULT NULL,
  `LastPeriodDate` varchar(255) DEFAULT NULL,
  `PregantDate` varchar(255) DEFAULT NULL,
  `PrescriptionURL` varchar(255) DEFAULT NULL,
  `createdBy` varchar(255) DEFAULT NULL,
  `updatedBy` varchar(255) DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `Height` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `todaysappointments`
--

INSERT INTO `todaysappointments` (`id`, `Title`, `PatientId`, `GynicId`, `ClinicId`, `AppointmentDate`, `AppointmentTime`, `BookedDate`, `AppointmentType`, `AppointmentChannel`, `AppointmentStatus`, `Patient_BP`, `Patient_Weight`, `Patient_LastPeriodDate`, `ShortNote`, `FollowupDate`, `Name`, `Email`, `MobileNo`, `DOB`, `Age`, `Weight`, `Address`, `City`, `State`, `Pincode`, `Country`, `isPregant`, `LastPeriodDate`, `PregantDate`, `PrescriptionURL`, `createdBy`, `updatedBy`, `isActive`, `createdAt`, `updatedAt`, `Height`) VALUES
(1, 'Synography', 'test', 'Dr.BL8M', 'VatsalyaJ45C', '2021-03-05', 'test', 'test', 'test', 'test', 'tesst', 'test', 'test', 'test', 'test', 'test', 'tst', 'tst', 'tst', 'tst', 'tst', 'tst', 'tst', 'tst', 'tst', 'tst', 'tst', 'sts', 'tst', 'tst', 'tsts', 'tst', 'tst', 1, '2021-03-05 11:39:41', '2021-03-05 11:39:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vaccines`
--

CREATE TABLE `vaccines` (
  `id` int(11) NOT NULL,
  `VetId` varchar(255) DEFAULT NULL,
  `PetId` varchar(255) DEFAULT NULL,
  `VaccineName` varchar(255) DEFAULT NULL,
  `Discription` varchar(255) DEFAULT NULL,
  `Date` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `vets`
--

CREATE TABLE `vets` (
  `id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `UserId` varchar(255) DEFAULT NULL,
  `Role` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `HouesNo` varchar(255) DEFAULT NULL,
  `City` varchar(255) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL,
  `Pincode` varchar(255) DEFAULT NULL,
  `Country` varchar(255) DEFAULT NULL,
  `Gender` varchar(255) DEFAULT NULL,
  `MobileNo` varchar(255) DEFAULT NULL,
  `DOB` varchar(255) DEFAULT NULL,
  `Experience` varchar(255) DEFAULT NULL,
  `ProfileImage` varchar(255) DEFAULT NULL,
  `ClinicName` varchar(255) DEFAULT NULL,
  `ClinicAddress` varchar(255) DEFAULT NULL,
  `ClinicGstNumber` varchar(255) DEFAULT NULL,
  `ClinicRegistrationNumber` varchar(255) DEFAULT NULL,
  `ClinicTime` varchar(255) DEFAULT NULL,
  `AppointmentTime` varchar(255) DEFAULT NULL,
  `StartDate` varchar(255) DEFAULT NULL,
  `EndDate` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `ReferedBy` varchar(255) DEFAULT NULL,
  `IsActive` tinyint(1) DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bookappointments`
--
ALTER TABLE `bookappointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `broadcast`
--
ALTER TABLE `broadcast`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `broadcasts`
--
ALTER TABLE `broadcasts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clinics`
--
ALTER TABLE `clinics`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fosters`
--
ALTER TABLE `fosters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `loyalties`
--
ALTER TABLE `loyalties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `mattings`
--
ALTER TABLE `mattings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `patientdetails`
--
ALTER TABLE `patientdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `petdetails`
--
ALTER TABLE `petdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pets`
--
ALTER TABLE `pets`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productcategories`
--
ALTER TABLE `productcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `register_users`
--
ALTER TABLE `register_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicecategories`
--
ALTER TABLE `servicecategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setappointments`
--
ALTER TABLE `setappointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `slots`
--
ALTER TABLE `slots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tips`
--
ALTER TABLE `tips`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todaysappointments`
--
ALTER TABLE `todaysappointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vaccines`
--
ALTER TABLE `vaccines`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vets`
--
ALTER TABLE `vets`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `bookappointments`
--
ALTER TABLE `bookappointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `broadcast`
--
ALTER TABLE `broadcast`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `broadcasts`
--
ALTER TABLE `broadcasts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `clinics`
--
ALTER TABLE `clinics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `fosters`
--
ALTER TABLE `fosters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `loyalties`
--
ALTER TABLE `loyalties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mattings`
--
ALTER TABLE `mattings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patientdetails`
--
ALTER TABLE `patientdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `petdetails`
--
ALTER TABLE `petdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pets`
--
ALTER TABLE `pets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `productcategories`
--
ALTER TABLE `productcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `register_users`
--
ALTER TABLE `register_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `servicecategories`
--
ALTER TABLE `servicecategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `setappointments`
--
ALTER TABLE `setappointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `slots`
--
ALTER TABLE `slots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tips`
--
ALTER TABLE `tips`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `todaysappointments`
--
ALTER TABLE `todaysappointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `vaccines`
--
ALTER TABLE `vaccines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `vets`
--
ALTER TABLE `vets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
