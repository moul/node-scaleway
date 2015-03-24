BUNDLE ?=	browser/bundle.js
MAP ?=		browser/bundle.map.js
NPM ?=		npm
BROWSERIFY ?=	node_modules/.bin/browserify
EXORCIST ?=	node_modules/.bin/exorcist

BROWSER_ENTRY =	lib/index.js
SOURCES =	$(wildcard lib/*.js)


all:	$(BUNDLE)


build:
	$(NPM) build


$(BUNDLE):	$(BROWSER_ENTRY) $(SOURCES) Makefile
	rm -f $(MAP) $@.tmp
	$(BROWSERIFY) \
		--debug \
		-x lodash \
		-x debug \
		-x rc \
		-x request-promise \
		$(BROWSER_ENTRY) | $(EXORCIST) $(MAP) > $@.tmp
	@test -s $@.tmp
	mv $@.tmp $@


clean:
	rm -f $(BUNDLE) $(MAP)
