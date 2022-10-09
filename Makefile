install:
	@docker-compose build


up:
	@docker-compose up


down:
	@docker-compose down


clean:
	@docker-compose down --volumes --remove-orphans


backend-sh:
	@docker-compose run --rm --service-ports backend sh


frontend-sh:
	@docker-compose run --rm --service-ports frontend sh


postgres-migrate:
	@docker-compose exec backend npm run migrate


postgres-sh:
	@docker-compose exec postgres psql -U postgres


.PHONY: install up down clean backend-sh frontend-sh postgres-migrate postgres-sh
