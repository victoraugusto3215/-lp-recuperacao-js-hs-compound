FROM haskell:8.10.7

WORKDIR /app

COPY . /app

RUN stack setup --no-terminal
RUN stack build --no-terminal

EXPOSE 8080

CMD ["stack", "exec", "lp-recuperacao-backend-exe"]
