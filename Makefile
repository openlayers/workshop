.DELETE_ON_ERROR:

NODE_MODULES := ./node_modules

BUILD_DIR := ./build
DIST_DIR := ./dist
SRC_DIR := ./src
SRC_DOC := $(shell find $(SRC_DIR)/doc -type f)

# Build all artifacts for distribution
.PHONY: dist
dist: clean doc resources

.PHONY: clean
clean:
	@rm -rf $(BUILD_DIR)
	@rm -rf $(DIST_DIR)

# Build the workshop HTML documentation
.PHONY: doc
doc: $(BUILD_DIR)/doc.time

$(BUILD_DIR)/doc.time: $(SRC_DOC)
	@mkdir -p $(BUILD_DIR)
	sphinx-build -d $(BUILD_DIR)/doctrees src/doc $(DIST_DIR)/doc
	@touch $@

# Build the workshop PDF (this requires pdflatex)
.PHONY: pdf
pdf: $(BUILD_DIR)/pdf.time

$(BUILD_DIR)/pdf.time: $(SRC_DOC)
	@mkdir -p $(BUILD_DIR)
	sphinx-build -b latex -d $(BUILD_DIR)/doctrees src/doc $(BUILD_DIR)/pdf
	$(MAKE) --directory $(BUILD_DIR)/pdf
	@touch $@

# Install dependencies
.PHONY: install
install: $(BUILD_DIR)/npm-install.time

$(BUILD_DIR)/npm-install.time: package.json
	@npm prune
	@npm install
	@touch $@

# Copy static workshop resources
.PHONY: resources
resources: $(DIST_DIR)/ol.css
	@mkdir -p $(DIST_DIR)/data
	@mkdir -p $(DIST_DIR)/examples
	@cp -r $(SRC_DIR)/data/* $(DIST_DIR)/data/
	@cp -r $(SRC_DIR)/examples/* $(DIST_DIR)/examples/

$(DIST_DIR)/ol.css: $(NODE_MODULES)/openlayers/css/ol.css
	@cp $< $@

$(NODE_MODULES)/openlayers/css/ol.css: install
