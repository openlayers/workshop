.DELETE_ON_ERROR:
export PATH := ./node_modules/.bin:$(PATH)

BUILD_DIR := ./build
DIST_DIR := ./dist
SRC_DOC := $(shell find src/doc -type f)

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
