server {
    {{ if not .ssl }}
    listen {{ .port }} default_server;
    {{ else }}
    listen {{ .port }} default_server ssl http2;
    {{ end }}

    include /etc/nginx/includes/server_params.conf;
    include /etc/nginx/includes/proxy_params.conf;

    {{ if .ssl }}
    include /etc/nginx/includes/ssl_params.conf;

    ssl_certificate /ssl/{{ .certfile }};
    ssl_certificate_key /ssl/{{ .keyfile }};
    {{ end }}

    {{ if not .leave_front_door_open }}
    location = /authentication {
        internal;
        proxy_pass              http://supervisor/auth;
        proxy_pass_request_body off;
        proxy_set_header        Content-Length "";
        proxy_set_header        X-Supervisor-Token "{{ env "SUPERVISOR_TOKEN" }}";
    }
    {{ end }}

    location /endpoint/ {
        proxy_pass http://backend;
    }

    location / {
        {{ if not .leave_front_door_open }}
        auth_request /authentication;
        auth_request_set $auth_status $upstream_status;
        {{ end }}

        proxy_pass http://backend;
    }
}
