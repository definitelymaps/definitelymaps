.PHONY: install
install:
	@docker-compose build


.PHONY: up
up:
	@docker-compose up


.PHONY: down
down:
	@docker-compose down


.PHONY: clean
clean:
	@docker-compose down --volumes --remove-orphans


.PHONY: backend-sh
backend-sh:
	@docker-compose run --rm --service-ports backend sh


.PHONY: frontend-sh
frontend-sh:
	@docker-compose run --rm --service-ports frontend sh


.PHONY: postgres-migrate
postgres-migrate:
	@docker-compose exec backend npm run migrate


.PHONY: postgres-sh
postgres-sh:
	@docker-compose exec postgres psql -U postgres
