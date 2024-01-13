mc_style = [[
<style>
    motion-canvas-player {
        width:  75%;
        /* height: 25vh; */
        display: block inline;
    }
</style>
]]

return {
  ['motion-canvas'] = function(args, kwargs, meta, raw_args) 

    quarto.doc.add_html_dependency({
      name = "motion-canvas", 
      version = "0.1.1",
      scripts = {'motion-canvas-player.js'},
      head = mc_style,
    })

    local src = pandoc.utils.stringify(args[1])
    -- quarto.log.output(src)
    -- local src = args[1]
    local var = pandoc.utils.stringify(raw_args)
    -- return pandoc.Str("Hello " .. var .. " from Motion-canvas!")
    return pandoc.RawInline('html', 
      '<motion-canvas-player src="' .. src .. '" auto="true";></motion-canvas-player>'
      -- '<motion-canvas-player src="' .. src .. '" ></motion-canvas-player>'
    )
  end
}
