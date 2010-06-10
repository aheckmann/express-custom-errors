# express-custom-errors

Express provides a couple helper methods for handling 500 and 404 errors. These are great.  
But what if you want to serve customized views for 403, 502, etc? That's what this plugin is for.

## Getting Started

Create a views subdirectory named errors. 

    <root>/views/errors
    
Within the errors directory, create your views the way you do normally, naming them with the status code you want them to handle.

    <root>/views/errors/502.html.haml
    <root>/views/errors/403.html.haml
    <root>/views/errors/413.ejs.html

Include the plugin

    use(require('path/to/custom-errors').CustomErrors)
    
That's it!

## Options

    use(require('path/to/custom-errors').CustomErrors, { dir: "errors"})
 
  - dir {string}
    - The directory containing the error views. Must be a subdirectory of `set('views')`.
  
  The options object is also passed into `request.render()` so you can set layouts and locals etc.
  
    use( 
      require('path/to/custom-errors').CustomErrors
    , { dir: "errors"
      , layout: "errors-layout.html.haml"
      , locals: { name: "Aaron" }
      }
    )

## Express version
Compatible with 0.13.0
 
## License 

(The MIT License)

Copyright (c) 2010 [Aaron Heckmann](aaron.heckmann+github@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
