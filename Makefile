.PHONY: help install dev build start docker-up docker-down docker-logs seed clean setup

help:
	@echo "Available commands:"
	@echo "  make install      - Install dependencies"
	@echo "  make dev          - Start development server"
	@echo "  make docker-up    - Start Docker containers"
	@echo "  make docker-down  - Stop Docker containers"
	@echo "  make docker-logs  - View Docker logs"
	@echo "  make seed         - Seed database with test data"
	@echo "  make setup        - Setup development environment (create .env, start docker, seed)"
	@echo "  make clean        - Remove build artifacts"

setup:
	./setup.sh

install:
	npm install

dev:
	npm run dev

build:
	npm run build

start:
	npm start

docker-up:
	docker-compose up -d
	@echo "Containers started! App: http://localhost:9000 | MongoDB UI: http://localhost:8081"

docker-down:
	docker-compose down

docker-logs:
	docker-compose logs -f app

seed:
	npm run seed

clean:
	rm -rf dist node_modules
