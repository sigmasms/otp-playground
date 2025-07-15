FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig*.json ./

RUN corepack enable
RUN corepack prepare pnpm@latest-8 --activate
RUN pnpm config set store-dir /usr/src/app/node_modules/.pnpm-store
RUN pnpm i

RUN rm -f .npmrc

COPY . .

CMD ["npm", "run", "start"]
