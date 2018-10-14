build:
	docker build -f Dockerfile .

install:
	docker-compose -f docker-compose.build.yml run --rm install

lint:
	npm lint;

run: start

start:
	supervisor keystone.js;

.PHONY: test
