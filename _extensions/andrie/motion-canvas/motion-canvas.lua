mc_style = [[
<style>
    motion-canvas-player { width:  75%; }
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

    local getKwarg = function(key)
      if kwargs[key] then
        local value = stringify(kwargs[key])
        value = string.gsub(value, "^\"(.*)\"$", "%1")
        return value
      else
        return ""
      end
    end

    -- function to parse kwargs
    -- takes input of key and returns string 'key="value"'
    local parse_kwarg = function(key, default, css)
      css = css or false -- default to false
      local value = getKwarg(key)
      if value == "" then value = default end
      if css then 
        return key .. ':' .. value .. '; '
      else 
        return key .. '="' .. value .. '" '
      end  
    end


    local fullscreen
    if getKwarg("fullscreen") == "true" then
      fullscreen = 'style="position:absolute; top:0; width:100%;"'
    else
      fullscreen = ''
    end

    local width = getKwarg("width")
    if fullscreen ~= "" then
      width = ""
    else
      width = "width:" .. width .. "; "
    end

    local auto = getKwarg("auto")
    if auto == "true" then
      auto = 'auto=true '
    else
      auto = ''
    end

    local cmdArgs = ""
    cmdArgs = cmdArgs .. 
      auto ..
      parse_kwarg("loop", "true") ..
      fullscreen ..
      width ..
      ''

      
      local out = 
      '<motion-canvas-player src="' .. src .. '" ' .. cmdArgs ..'></motion-canvas-player>'
      -- quarto.log.output(out)

    return pandoc.RawInline('html', out)
  end
}
