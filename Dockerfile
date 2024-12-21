ARG NODE_VERSION=22

FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /code

COPY src/web-ui/package*.json ./
RUN npm clean-install
COPY src/web-ui/ ./
RUN npm run build

FROM pierrezemb/gostatic:latest AS runtime

LABEL description="Jarklin - Web-UI"
LABEL website="https://jarklin.github.io/"

COPY --from=builder /code/dist/ /srv/http/

EXPOSE 80

CMD ["-port", "80"]
