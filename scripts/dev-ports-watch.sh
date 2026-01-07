#!/bin/bash
# Watches running dev servers and syncs APP_PORTS into each app's .env.local.

set -u

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"
APPS_DIR="$ROOT_DIR/apps"
POLL_INTERVAL="${APP_PORTS_POLL_INTERVAL:-2}"
ENV_KEY="APP_PORTS"
PUBLIC_ENV_KEY="NEXT_PUBLIC_APP_PORTS"
LOG_FILE="$ROOT_DIR/.context/app-ports.log"

log() {
  if [ "${APP_PORTS_DEBUG:-}" = "1" ]; then
    mkdir -p "$(dirname "$LOG_FILE")"
    printf '[app-ports] %s\n' "$*" >> "$LOG_FILE"
  fi
}

list_apps() {
  local app_path
  for app_path in "$APPS_DIR"/*; do
    [ -d "$app_path" ] || continue
    [ -f "$app_path/package.json" ] || continue
    basename "$app_path"
  done
}

pid_cwd() {
  lsof -a -p "$1" -d cwd -Fn 2>/dev/null | sed -n 's/^n//p'
}

pid_cmdline() {
  ps -p "$1" -o command= 2>/dev/null || true
}

scan_ports() {
  local cmd pid addr port cwd cmdline app app_path idx

  while read -r cmd pid addr; do
    [ -n "$cmd" ] || continue

    case "$cmd" in
      node|bun|next|pnpm)
        ;;
      *)
        continue
        ;;
    esac

    port="${addr##*:}"
    case "$port" in
      ''|*[!0-9]*)
        continue
        ;;
      9229|9230)
        continue
        ;;
    esac

    cwd="$(pid_cwd "$pid")"
    cmdline="$(pid_cmdline "$pid")"
    if [ -z "$cwd" ] && [ -z "$cmdline" ]; then
      continue
    fi

    if [[ "$cwd" != "$ROOT_DIR" && "$cwd" != "$ROOT_DIR"/* && "$cmdline" != *"$ROOT_DIR"* ]]; then
      continue
    fi

    for idx in "${!apps[@]}"; do
      app="${apps[$idx]}"
      app_path="$APPS_DIR/$app"
      if [ -n "${ports[$idx]:-}" ]; then
        continue
      fi
      if [[ "$cwd" == "$app_path" || "$cwd" == "$app_path"/* || "$cmdline" == *"$app_path"* ]]; then
        ports[$idx]="$port"
      fi
    done
  done < <(lsof -nP -iTCP -sTCP:LISTEN 2>/dev/null | awk 'NR>1 {print $1, $2, $9}')
}

write_env_value() {
  local file="$1"
  local key="$2"
  local value="$3"
  local new_line="${key}=\"${value}\""

  if [ -f "$file" ]; then
    local current
    current="$(grep -m1 "^${key}=" "$file" 2>/dev/null || true)"
    if [ "$current" = "$new_line" ]; then
      return 0
    fi

    local tmp
    tmp="${file}.tmp"
    awk -v newline="$new_line" -v key="$key" '
      BEGIN { done = 0 }
      $0 ~ "^" key "=" {
        if (!done) { print newline; done = 1 }
        next
      }
      { print }
      END { if (!done) print newline }
    ' "$file" > "$tmp"
    mv "$tmp" "$file"
  else
    printf '%s\n' "$new_line" > "$file"
  fi
}

apps=()
while IFS= read -r app; do
  [ -n "$app" ] || continue
  apps+=("$app")
done < <(list_apps)

if [ "${#apps[@]}" -eq 0 ]; then
  exit 0
fi

last_ports=""
log "Watching apps: ${apps[*]}"

while true; do
  ports=()
  scan_ports
  app_ports=""

  for idx in "${!apps[@]}"; do
    app="${apps[$idx]}"
    port="${ports[$idx]:-}"
    if [ -n "$port" ]; then
      if [ -n "$app_ports" ]; then
        app_ports="${app_ports},${app}:${port}"
      else
        app_ports="${app}:${port}"
      fi
    fi
  done

  if [ "$app_ports" != "$last_ports" ]; then
    for app in "${apps[@]}"; do
      write_env_value "$APPS_DIR/$app/.env.local" "$ENV_KEY" "$app_ports"
      write_env_value "$APPS_DIR/$app/.env.local" "$PUBLIC_ENV_KEY" "$app_ports"
    done
    log "Updated APP_PORTS: $app_ports"
    last_ports="$app_ports"
  fi

  sleep "$POLL_INTERVAL"
done
