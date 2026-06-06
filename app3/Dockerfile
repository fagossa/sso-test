FROM nginx:stable-alpine
COPY default.conf /etc/nginx/conf.d/default.conf
COPY app1_unavailable.html /usr/share/nginx/html/app1_unavailable.html
COPY app2_unavailable.html /usr/share/nginx/html/app2_unavailable.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
