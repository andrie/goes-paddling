# Makefile

# Phony target to prevent file name conflict
.PHONY: all anim quarto publish serve

# Default target
all: anim quarto publish

# Target for building animations
anim:
	npm run build
	npm --prefix ./animations run build


serve:
	npm --prefix ./animations run serve

quarto:
	quarto render pres.qmd

publish:
	quarto render pres.qmd
	quarto publish pres.qmd --no-prompt