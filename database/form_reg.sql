-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 09 2019 г., 18:12
-- Версия сервера: 10.1.37-MariaDB
-- Версия PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `form_reg`
--

-- --------------------------------------------------------

--
-- Структура таблицы `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `country` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `countries`
--

INSERT INTO `countries` (`id`, `country`) VALUES
(1, 'Ukraine'),
(2, 'France'),
(3, 'Italy'),
(4, 'Japan'),
(5, 'Canada'),
(6, 'Spain'),
(7, 'USA'),
(8, 'Argentina'),
(9, 'Kongo');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `login` varchar(60) NOT NULL,
  `name` text NOT NULL,
  `password` char(60) NOT NULL,
  `birth_date` date NOT NULL,
  `countryId` int(11) DEFAULT NULL,
  `timestamp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `email`, `login`, `name`, `password`, `birth_date`, `countryId`, `timestamp`) VALUES
(3, 'ttt@ttt', 'Vassss', 'tttt', '$2b$10$v0pcxUMwsSz9lVBO67nKwu1CWvNWqG3EHVPf.VhAcrgzTtQ22ameq', '2000-02-11', 9, 2147483647),
(4, 'hhhhh@hhh.hh', 'hhh', 'hjhjh', '$2b$10$Z46oHHom0cXt7fhgE6SDQOUB6O6dUteU231JYz0OO7GqQtlLAMBRy', '2015-05-04', 4, 2147483647),
(5, 'hhhhh@hhh.hh1', 'hhh1', 'hjhjh', '$2b$10$9KZxJ09CJ6TJBlbu7OYvHedihxjj.bfDQ3m5vq7vz0CzOAx2M62oO', '1111-11-11', 1, 2147483647),
(6, 'hhhhh@hhh.hh12', 'hhh12', 'hjhjh2', '$2b$10$6VJ3jNDbUeSKg2UcFXl.Iu4QqVsln3EsmppQGATTZ19.ZwKu.7Nz6', '1990-01-12', 5, 2147483647),
(7, 'aeae@ada', 'Aeae', 'SAas', '$2b$10$CgAml/OXifp0EEtZtgTk6.TuFIR5YffskRbOT3q7XLcPz5T9dQb26', '2000-03-12', 6, 2147483647),
(8, 'aeae@ada1', 'Aeae1', 'SAas', '$2b$10$/a/smiOfY81WrtEbBUMJs.nOpA4/RM2jGgVC2qVWYpE4OvFw3.wwy', '2000-02-11', 6, 2147483647),
(9, 'aeae@ada2', 'Aeae2', 'SAas', '$2b$10$2AiNhnxpZs2pgz0O2SiYCOYsk9hirzHZaF5S09fN1HHyfQCtoOEEy', '2000-02-11', 6, 2147483647),
(14, 'vvv@vvv5', 'Vassss1', 'AAAAA', '$2b$10$mhjLkv7kSHc9ekvKlfErzO2v426Szdp4Ev12qGhbj./3VyyKBcGWW', '1111-11-11', 2, 1551807347),
(15, 'fsdf@sdf', 'sdfgdfg', 'dsfsdf', '$2b$10$iRrkXvDoh.L6t8dZ0CJliumBL9SYJaLenmZJOkD52kIPIscYQwk2i', '0233-02-11', 8, 1551808829);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `login` (`login`),
  ADD KEY `countryId` (`countryId`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`countryId`) REFERENCES `countries` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
