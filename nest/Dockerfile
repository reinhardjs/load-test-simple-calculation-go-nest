FROM node:18.13.0-bullseye-slim AS builder
WORKDIR /app

COPY package*.json ./
COPY . ./
RUN yarn install
RUN yarn run build

FROM node:18.13.0-bullseye-slim AS runner
WORKDIR /app

RUN apt-get update -y && DEBIAN_FRONTEND=noninteractive apt-get install -y curl telnet net-tools
RUN adduser --disabled-password --gecos '' user

RUN chown -R user:user /app/

COPY --from=builder --chown=user:user /app/node_modules ./node_modules
COPY --from=builder --chown=user:user /app/*.json ./
COPY --from=builder --chown=user:user /app/dist ./dist

USER user

EXPOSE 4200

CMD ["node", "dist/main.js"]
