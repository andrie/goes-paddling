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
	quarto render paddling.qmd

publish:
	quarto render paddling.qmd
	quarto publish paddling.qmd --no-prompt