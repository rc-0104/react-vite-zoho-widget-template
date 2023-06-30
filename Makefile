build:
	yarn build
	touch app/assets/static.js
	touch app/assets/static.css
	touch app/index.html

	rm -f app/assets/*.js
	rm -f app/assets/*.css
	rm -f app/index.html

	node update-index-html.js

	cp dist/assets/*.js app/assets
	cp dist/assets/*.css app/assets
	cp dist/index.html app/index.html
	npx zet validate
	npx zet pack


.PHONY: build