const route = (handle, pathname, res) => {
  console.log(`About to route a request for ${pathname}`)

  if(typeof handle[pathname] === 'function') {
    // return handle[pathname]()
    handle[pathname](res)
  } else {
    console.log(`No request handler for ${pathname}`)
    // return '404 Not Found'
    res.writeHead(404, {'Content-Type': 'text/plain'})
    res.write("404 Not Found")
    res.end()
  }
}

exports.route = route