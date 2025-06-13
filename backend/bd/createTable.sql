CREATE TABLE if not exists usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    apellido VARCHAR(255),
	email VARCHAR(255),
    contrasena VARCHAR(255),
    admin BOOL DEFAULT false
);

CREATE TABLE if not exists categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255)
);

CREATE TABLE if not exists actividad (
    id_actividad INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255),
    descripcion TEXT,
	id_categoria INT,
    horario time,
    cupo INT,
    id_usuario INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);

CREATE TABLE if not exists inscripcion (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_actividad INT,
    FOREIGN KEY (id_actividad) REFERENCES actividad(id_actividad),
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
);