FROM node:20.11.1-buster AS front
LABEL authors="Dmitry M"

RUN mkdir -p /app/static && chown -R node:node /app
USER node
WORKDIR "/app"

COPY --chown=node:node ["package.json", "package-lock.json", "./"]
COPY --chown=node:node js/ ./js

RUN mkdir -p /app/static && npm install && npm run build && rm -rf node_modules

FROM python:3.11-buster AS app

ENV POETRY_VIRTUALENVS_PATH=/app/.venv
RUN useradd -d /app -m -s /bin/bash maps
WORKDIR "/app"

COPY --from=front /app/static/* ./static/
COPY ./ ./

RUN pip install poetry && \
    POETRY_VIRTUALENVS_CREATE=true POETRY_VIRTUALENVS_IN_PROJECT=true poetry install --sync --no-interaction --no-ansi --only=main --no-root

USER maps
RUN mkdir -p polylines

EXPOSE 3000

CMD ["poetry", "run", "python", "main.py"]
