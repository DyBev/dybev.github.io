#!/usr/bin/env bash

set -e

CMD_DIR="./functions"
BUILD_DIR="./build"
GOOS_TARGET="linux"
GOARCH_TARGET="amd64"

usage() {
  echo "Usage: $0 {new|build|list} [function-name]"
  echo
  echo "Commands:"
  echo "  new <name>     Create a new Lambda function scaffold"
  echo "  build <name>   Build and package a Lambda function for deployment"
  echo "  list           List all available Lambda functions"
  echo
  exit 1
}

list_functions() {
  echo "Available Lambda functions:"
  find "$CMD_DIR" -mindepth 1 -maxdepth 1 -type d -exec basename {} \;
}

create_function() {
  local name="$1"
  local dir="$CMD_DIR/$name"

  if [ -z "$name" ]; then
    echo "Error: function name required."
    usage
  fi

  if [ -d "$dir" ]; then
    echo "Error: $name already exists."
    exit 1
  fi

  mkdir -p "$dir"
  cat > "$dir/main.go" <<EOF
package main

import (
    "context"
    "fmt"

    "github.com/aws/aws-lambda-go/lambda"
)

type Event struct {
    Message string \`json:"message"\`
}

func HandleRequest(ctx context.Context, event Event) (string, error) {
    fmt.Printf("Received message: %s\\n", event.Message)
    return fmt.Sprintf("Hello from %s!", "$name"), nil
}

func main() {
    lambda.Start(HandleRequest)
}
EOF

  echo "✅ Created new function scaffold: $dir/main.go"
}

build_function() {
  local name="$1"
  local src="$CMD_DIR/$name"
  local outdir="$BUILD_DIR/$name"

  if [ -z "$name" ]; then
    echo "Error: function name required."
    usage
  fi

  if [ ! -d "$src" ]; then
    echo "Error: function '$name' not found under $CMD_DIR."
    exit 1
  fi

  mkdir -p "$outdir"

  echo "🚀 Building $name..."
  CGO_ENABLED=0 GOOS=linux GOARCH=arm64 go build -o "$outdir/bootstrap" -tags lambda.norpc "$src"

  echo "📦 Packaging zip..."
  chmod +x "$outdir/bootstrap"

  (cd "$outdir" && zip -r "../${name}.zip" bootstrap > /dev/null)

  echo "✅ Build complete: $BUILD_DIR/${name}.zip"
}

COMMAND="$1"
FUNCTION_NAME="$2"

case "$COMMAND" in
  new)
    create_function "$FUNCTION_NAME"
    ;;
  build)
    build_function "$FUNCTION_NAME"
    ;;
  list)
    list_functions
    ;;
  *)
    usage
    ;;
esac
