CGO_ENABLED := 0
BUILD_DIR := ./build
GOOS := linux
GOARCH := arm64

run:
	CGO_ENABLED=$(CGO_ENABLED) go run ./main.go

list:
	./manage.sh list

ARG ?= $(word 2,$(MAKECMDGOALS))
new:
	./manage.sh new $(ARG)

build:
	./manage.sh build $(ARG)

%:
	@:
