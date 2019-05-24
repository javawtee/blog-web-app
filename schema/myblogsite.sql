-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th5 23, 2019 lúc 02:07 AM
-- Phiên bản máy phục vụ: 10.1.38-MariaDB
-- Phiên bản PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `myblogsite`
--

-- --------------------------------------------------------

CREATE DATABASE myblogsite;

use myblogsite;

--
-- Cấu trúc bảng cho bảng `tweets`
--

CREATE TABLE `tweets` (
  `id` int(11) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  `tweeted_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `tweet` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Đang đổ dữ liệu cho bảng `tweets`
--

INSERT INTO `tweets` (`id`, `user_name`, `tweeted_time`, `tweet`) VALUES
(1, 'Tee', '2019-05-22 03:17:06', 'This is my first tweet'),
(2, 'Tee', '2019-05-22 03:18:41', '\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"'),
(3, 'Tee', '2019-05-22 03:19:07', '\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"'),
(4, 'Tee', '2019-05-22 03:20:23', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ex quam, efficitur ut dui tempor, mollis faucibus elit. Aliquam tempus placerat tempor. Nulla facilisi. Mauris laoreet maximus augue vitae commodo. Sed mollis, tellus et hendrerit ullamcorper, augue erat sollicitudin lacus, vitae sagittis erat leo sit amet sapien. Vivamus enim lorem, malesuada a rhoncus eu, aliquam nec enim. Cras bibendum augue non risus tristique vestibulum. Praesent ac leo sapien. Sed ornare auctor egestas. Integer pharetra tortor vitae ultricies rutrum. Aenean varius nisl non arcu vulputate hendrerit. Ut efficitur risus arcu, eget vehicula odio maximus non. Nam ex ipsum, mattis vitae semper a, tristique et velit. Phasellus aliquam auctor molestie. Sed cursus nibh sed diam pellentesque viverra. Nam tempor sodales augue et lobortis.\n\nAliquam odio mi, laoreet ac diam vel, sodales condimentum purus. Nunc interdum congue nulla, eu molestie ex condimentum et. Etiam commodo nulla viverra ante rhoncus, quis co'),
(5, 'Tee', '2019-05-22 03:20:39', 'Aliquam posuere magna non dui vehicula finibus. Suspendisse potenti. Phasellus id erat ut felis tristique malesuada vitae ac tortor. Etiam finibus, felis ac finibus fermentum, augue velit imperdiet est, non pharetra neque nunc vel odio. Sed luctus lorem at sapien mattis, at consequat massa consectetur. Donec a lectus ullamcorper, viverra urna et, blandit odio. Maecenas sit amet porttitor dolor. Proin malesuada varius ultrices. Quisque lacinia sapien eget dolor feugiat aliquam. Phasellus vitae tortor risus. In augue est, dapibus sit amet gravida blandit, elementum at massa.\n\nCras volutpat est sed metus commodo ullamcorper. Aenean et lacinia ex. Fusce varius ex ac est euismod, et tristique velit porta. Sed euismod posuere tincidunt. Nunc finibus est a nunc tempor porttitor. Sed ut bibendum tortor. Fusce nisi orci, auctor vel tellus vehicula, porta lobortis urna. Sed nunc odio, commodo sit amet metus id, hendrerit venenatis nibh. Nullam ut ex malesuada, blandit nibh a, ultricies mauris. S'),
(6, 'Tee', '2019-05-22 03:21:00', 'Phasellus ut est non tortor finibus hendrerit sed vel sapien. Nullam commodo pulvinar quam et porta. Nulla faucibus posuere leo, vitae rutrum leo interdum in. Fusce id sapien id augue molestie faucibus ut a lectus. Aenean molestie aliquet tortor, eu convallis leo. Nunc vel odio ligula. Sed ullamcorper orci non egestas tincidunt. Etiam placerat enim lacus, id commodo ex consequat sed. Nulla libero orci, porta dapibus quam sed, vulputate tincidunt urna. Sed quis dui at eros condimentum dapibus eget a nisi. Curabitur pulvinar et massa ac vehicula.\n\nInteger mattis placerat metus, id porttitor tellus laoreet in. Donec dictum viverra arcu sollicitudin sagittis. Maecenas in aliquam lacus. Aliquam mollis accumsan purus, a egestas eros rutrum et. Vivamus tincidunt eleifend magna, et mattis justo convallis a. Nunc fermentum ut lectus non dignissim. In mattis leo in bibendum dictum. Mauris at nisi tristique, finibus eros et, sollicitudin erat.\n\nPellentesque habitant morbi tristique senectus et ne'),
(7, 'Thong Le', '2019-05-22 03:41:42', 'Nulla quis imperdiet ante. Maecenas facilisis eu elit sit amet rutrum. Integer commodo lectus vitae nisl mollis pharetra. Pellentesque mauris neque, vestibulum id augue id, sagittis ullamcorper massa. Morbi sit amet gravida urna. Curabitur quis consequat est, sit amet bibendum erat. Nunc condimentum purus quis libero sodales, non ornare velit gravida. Nullam accumsan erat justo, et dignissim orci congue vitae. Praesent pharetra elit turpis, vitae vulputate libero tristique eu. Morbi id nisl sed est blandit gravida ac ut velit. Quisque eget volutpat arcu. Etiam at dolor purus. Nulla facilisi. In malesuada tortor quam. Suspendisse consequat odio urna, quis lobortis massa varius quis.\n\nAliquam posuere magna non dui vehicula finibus. Suspendisse potenti. Phasellus id erat ut felis tristique malesuada vitae ac tortor. Etiam finibus, felis ac finibus fermentum, augue velit imperdiet est, non pharetra neque nunc vel odio. Sed luctus lorem at sapien mattis, at consequat massa consectetur. Done'),
(8, 'Tee', '2019-05-22 03:42:10', 'Cras volutpat est sed metus commodo ullamcorper. Aenean et lacinia ex. Fusce varius ex ac est euismod, et tristique velit porta. Sed euismod posuere tincidunt. Nunc finibus est a nunc tempor porttitor. Sed ut bibendum tortor. Fusce nisi orci, auctor vel tellus vehicula, porta lobortis urna. Sed nunc odio, commodo sit amet metus id, hendrerit venenatis nibh. Nullam ut ex malesuada, blandit nibh a, ultricies mauris. Sed elementum, odio in aliquam rutrum, mi diam placerat orci, sed vestibulum tortor erat nec nibh. Pellentesque vel porta elit, tristique semper lorem. Mauris at tortor malesuada, rutrum est in, fermentum ante.\n\nCras fringilla nibh odio, id facilisis enim convallis in. Mauris magna enim, facilisis nec mi ac, rhoncus fringilla ligula. Quisque a pharetra dui. Duis ultrices lectus et nulla maximus, vel ornare magna scelerisque. Phasellus eu neque metus. Nulla imperdiet non nulla sit amet semper. Duis non suscipit erat, at gravida nisl. Nullam ex neque, malesuada at lectus eget, '),
(9, 'Tee', '2019-05-22 04:05:16', 'Cras volutpat est sed metus commodo ullamcorper. Aenean et lacinia ex. Fusce varius ex ac est euismod, et tristique velit porta. Sed euismod posuere tincidunt. Nunc finibus est a nunc tempor porttitor. Sed ut bibendum tortor. Fusce nisi orci, auctor vel tellus vehicula, porta lobortis urna. Sed nunc odio, commodo sit amet metus id, hendrerit venenatis nibh. Nullam ut ex malesuada, blandit nibh a, ultricies mauris. Sed elementum, odio in aliquam rutrum, mi diam placerat orci, sed vestibulum tortor erat nec nibh. Pellentesque vel porta elit, tristique semper lorem. Mauris at tortor malesuada, rutrum est in, fermentum ante.\n\nCras fringilla nibh odio, id facilisis enim convallis in. Mauris magna enim, facilisis nec mi ac, rhoncus fringilla ligula. Quisque a pharetra dui. Duis ultrices lectus et nulla maximus, vel ornare magna scelerisque. Phasellus eu neque metus. Nulla imperdiet non nulla sit amet semper. Duis non suscipit erat, at gravida nisl. Nullam ex neque, malesuada at lectus eget, ');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(32) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COMMENT='i';

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(1, 'Tee', 'javawtee@gmail.com', '84561379'),
(2, 'Thong Le', 'thongle7592@gmail.com', '84561379');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `tweets`
--
ALTER TABLE `tweets`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `tweets`
--
ALTER TABLE `tweets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
