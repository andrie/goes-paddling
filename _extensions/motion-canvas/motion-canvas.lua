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

    local stringify = pandoc.utils.stringify

    local src = stringify(args[1])

    -- function to parse kwargs
    -- takes input of key and returns string 'key="value"'
    local parse_kwarg = function(key, default)
      local value = stringify(kwargs[key])
      -- remove leading and trailing quotes from value
      value = string.gsub(value, "^\"(.*)\"$", "%1")
      if value == "" then
        value = default
      end
      return key .. '="' .. value .. '" '
    end

    local cmdArgs = ""
    cmdArgs = cmdArgs .. 
      parse_kwarg("auto", "true") ..
      parse_kwarg("loop", "true")


    local out = 
    '<motion-canvas-player src="' .. src .. '" ' .. cmdArgs ..'></motion-canvas-player>'

    return pandoc.RawInline('html', out)
  end
}
