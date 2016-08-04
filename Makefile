lint: 
	npm lint;

run: start

start: 
	supervisor keystone.js;

.PHONY: test
