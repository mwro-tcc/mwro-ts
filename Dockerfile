FROM node:20-slim 
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

RUN pnpm install

EXPOSE 3040

CMD [ "pnpm", "dev" ]
