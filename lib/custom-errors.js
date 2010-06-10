
// Express - Custom Errors - Copyright Aaron Heckmann <aaron.heckmann+github@gmail.com> (MIT Licensed)

var fs = require('fs')
  , sys = require('sys')
  , path = require('path')
  , custom = {}
  , options

exports.CustomErrors = Plugin.extend({ 
  
  extend: { 
    
    /**
    * Registers custom error views. 
    *
    * Options: ( all options are passed to request.render() )
    *
    *   - dir   The views subdirectory storing custom error views. Default to "errors".
    *
    * @param  {hash} options
    * @api private
    */
    
    init: function(opts) {
      options = opts || {}
      var dir = set('views') + '/' + (options.dir = options.dir || 'errors')
      try {
        fs.readdirSync(dir).each(function(file){ 
          if (fs.statSync(dir + '/' + file).isFile())
            custom[ file.split('.').slice(-3)[0] ] = file
        })
      } catch (err) {
        if (err.errno !== process.ENOENT) throw err
      }
    }
    
  }, 
  
  on: { 
    
    /**
    * Overrides the response body if a custom http status code view is found.
    *
    * Examples:
    *
    *   views/erorrs/404.haml.html
    *   views/errors/500.haml.html
    *   views/errors/502.haml.html
    *   views/errors/413.haml.html
    *
    */
    
    response: function(event){ 
      var response = event.request.response
        , file = custom[response.status]
      if (file)
        event.request.render(options.dir + '/' + file, Object.create(options), function(err, content){
          if (err) {
            if (set('dump exceptions'))
              sys.puts(err.stack)
            if (set('throw exceptions'))
              throw err
            return
          }
          response.body = content
          response.headers['Content-Length'] = content.length
        })
    }  
    
  }
})