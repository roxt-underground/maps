local_build:
	@echo Сборка образа придложения
	docker build . -t maps:latest

run: local_build
	@echo Запуск сервера приложения из образа
	docker run --rm -it -p 3000:3000 maps

watch:
	@echo Запуск непрерывной сборки фронтенда при изменениях в папке ${PWD}
	docker run --rm -it -w /app --volume ${PWD}:/app node:20.11.1-buster npm run watch
