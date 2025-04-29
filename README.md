# Обеспечение безопасности проекта "Веб Ларёк. Плохой сервер"
**Стек:** Express, MongoDB, Nginx, Docker

**Проверены и устранены уязвимости следующих типов:**
* XSS (межсайтовый скриптинг)
* CSRF (межсайтовая подделка запросов)
* NoSQL-инъекция
* Переполнение буфера
* ReDoS (Regular Expression Denial of Service)
* DDoS (Distributed Denial of Service)
* Path Traversal (атака через обход директорий)

**Запуск:**
* `docker-compose -f docker-compose-local.yml up`
