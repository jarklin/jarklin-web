FROM node:22-alpine as builder

WORKDIR /code

COPY src/web-ui/ ./
RUN npm clean-install
RUN npm run build

FROM pierrezemb/gostatic:latest as runtime

LABEL description="Jarklin - Web-UI"
LABEL website="https://jarklin.github.io/"

COPY --from=builder /code/dist/ /srv/html/

EXPOSE 80

CMD ["-port", "80"]
