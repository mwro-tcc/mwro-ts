FROM node:20-slim 
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

# Had problems trying to build the container on Debian 12. Reinstalling corepack seemed to solve them.
RUN npm uninstall -g corepack && npm install -g corepack

RUN pnpm install

EXPOSE 3040

CMD [ "pnpm", "dev" ]
