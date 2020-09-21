/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2020 RDK Management
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// initialization:
var thunderJS

//var defaultHost = localStorage.getItem('host')
//var host = prompt('Please inform the IP address of your STB', defaultHost || '192.168.')

//localStorage.setItem('host', host)

thunderJS = ThunderJS({
  host: '127.0.0.1',
  port: 50050,
  debug: true
})

function reboot() {
  log('Calling: Controller.harakiri')
  thunderJS.Controller.harakiri()
    .then(function(result) {
      log('Success', result)
    })
    .catch(function(error) {
      log('Error', error)
    })
}

function startDacApp(app) {
  log('Calling: startDacApp '+app)
  thunderJS["org.rdk.RDKShell"].launch( 
      { "callsign": app, "uri": "/home/root/dac/apps/"+app, "type": "DACApplication"} )
    .then(function(result) {
      log('Success', result)
    })
    .catch(function(error) {
      log('Error', error)
    })
}

function stopDacApp(app) {
  log('Calling: stopDacApp '+app)
  thunderJS["org.rdk.RDKShell"].destroy( 
      { "callsign": app } )
    .then(function(result) {
      log('Success', result)
    })
    .catch(function(error) {
      log('Error', error)
    })
}

function startWebApp() {
  log('Calling: startWebApp')
  thunderJS["org.rdk.RDKShell"].launch( 
      { "callsign": "WebTest", "uri": "http://www.google.com", "type": "WebKitBrowser"} )
    .then(function(result) {
      log('Success', result)
    })
    .catch(function(error) {
      log('Error', error)
    })
}

function stopWebApp() {
  log('Calling: stopWebApp')
  thunderJS["org.rdk.RDKShell"].destroy( 
      { "callsign": "WebTest" } )
    .then(function(result) {
      log('Success', result)
    })
    .catch(function(error) {
      log('Error', error)
    })
}

function log(msg, content) {
  var el = document.getElementById('log')
  var entry = '<p class="font-bold">' + msg + '</p>'

  if (content) {
    entry += '<pre class="border mt-4 mb-8 text-sm">' + JSON.stringify(content, null, 2) + '</pre>'
  }

  entry += '<hr class="border-b" />'

  el.innerHTML += entry
}
