FROM ubuntu:18.04

RUN apt update -y \
    && apt install nginx curl vim -y \
    && apt-get install software-properties-common -y \
    && add-apt-repository ppa:certbot/certbot -y \
    && apt-get update -y \
    && apt-get install python-certbot-nginx -y \
    && apt-get clean

COPY ./options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf

COPY letsencrypt /etc/letsencrypt

EXPOSE 80

STOPSIGNAL SIGTERM

CMD ["nginx", "-g", "daemon off;"]