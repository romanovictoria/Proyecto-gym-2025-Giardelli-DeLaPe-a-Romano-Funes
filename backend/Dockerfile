# Imagen base
FROM golang:1.24.3

# Setear directorio de trabajo
WORKDIR /app

# Copiar archivos go
COPY go.mod ./
COPY go.sum ./
RUN go mod download

# Copiar el resto del código
COPY . .

# Compilar el backend
RUN go build -o main .

# Exponer el puerto que usás (ej: 8080)
EXPOSE 8080

# Comando por defecto
CMD ["./main"]
