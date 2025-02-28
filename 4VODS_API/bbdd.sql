-- Insertar datos en la tabla company
INSERT INTO `company` (`name`, `_active`) VALUES 
('Tech Solutions', 1),
('Green Energy Co.', 1),
('EduFuture', 1);

-- Insertar datos en la tabla degree
INSERT INTO `degree` (`name`, `_active`) VALUES 
('Computer Science', 1),
('Business Administration', 1),
('Environmental Engineering', 1);

-- Insertar datos en la tabla module
INSERT INTO `module` (`id_degree_id`, `name`, `_active`) VALUES 
(1, 'Software Development', 1),
(1, 'Data Structures', 1),
(2, 'Business Strategy', 1),
(3, 'Sustainable Technologies', 1);

-- Insertar datos en la tabla teacher
INSERT INTO `teacher` (`name`, `_active`) VALUES 
('John Doe', 1),
('Alice Smith', 1),
('Robert Johnson', 1);

-- Insertar datos en la tabla ods
INSERT INTO `ods` (`description`, `_active`, `dimension`) VALUES 
('No Poverty', 1, 'Social'),
('Quality Education', 1, 'Educational'),
('Climate Action', 1, 'Environmental');

-- Insertar datos en la tabla goal
INSERT INTO `goal` (`id_ods_id`, `description`, `_active`) VALUES 
(1, 'Reduce poverty levels by 20%', 1),
(2, 'Improve education accessibility', 1),
(3, 'Reduce carbon footprint by 30%', 1);

-- Insertar datos en la tabla iniciative
INSERT INTO `iniciative` (`name`, `description`, `start_date`, `end_date`, `hours`, `_active`, `school_year`, `innovative`) VALUES 
('Tech for All', 'Provide free coding lessons', '2025-01-10', '2025-06-15', 120, 1, '2024-2025', 1),
('Business Growth', 'Help startups with strategy', '2025-02-01', '2025-12-31', 200, 1, '2024-2025', 0),
('Eco-Friendly Future', 'Implement green initiatives', '2025-03-05', '2025-09-20', 150, 1, '2024-2025', 1);

-- Insertar datos en la tabla company_iniciative
INSERT INTO `company_iniciative` (`id_iniciative_id`, `id_company_id`, `_active`) VALUES 
(1, 1, 1),
(2, 2, 1),
(3, 3, 1);

-- Insertar datos en la tabla iniciative_goal
INSERT INTO `iniciative_goal` (`id_iniciative_id`, `id_goal_id`, `_active`) VALUES 
(1, 2, 1),
(2, 1, 1),
(3, 3, 1);

-- Insertar datos en la tabla module_iniciative
INSERT INTO `module_iniciative` (`id_module_id`, `id_iniciative_id`, `_active`) VALUES 
(1, 1, 1),
(3, 2, 1),
(4, 3, 1);

-- Insertar datos en la tabla teacher_module
INSERT INTO `teacher_module` (`id_module_id`, `id_teacher_id`, `_active`) VALUES 
(1, 1, 1),
(2, 1, 1),
(3, 2, 1),
(4, 3, 1);

-- Insertar datos en la tabla teacher_iniciative
INSERT INTO `teacher_iniciative` (`id_teacher_id`, `id_iniciative_id`, `_active`) VALUES 
(1, 1, 1),
(2, 2, 1),
(3, 3, 1);

--Insertar datos en la tabla diffusion
INSERT INTO `diffusion`( `iniciative_id`, `type`, `link`) VALUES ('1','instagram','https://asdf')
