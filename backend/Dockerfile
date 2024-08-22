FROM golang:1.23-bullseye

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY . .

COPY wait-for-it.sh /app/wait-for-it.sh

RUN chmod +x /app/wait-for-it.sh

RUN go build -o main

EXPOSE 3000

CMD ["./wait-for-it.sh", "db:5432", "--", "./main"]