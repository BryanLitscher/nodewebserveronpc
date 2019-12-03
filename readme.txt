/*
Wiring to Numato board
							resistor
GPIO0 ( 3.3 V )------------/\/\/---------------------------------GPIO2		
									|
									\
									 \  switch
									|
									|
GND ________________________________|

When switch closes circle in browser user interface turns red



<!-- Create environment, assuming node is installed -->
<!-- npm install socket.io --save -->
<!-- npm install serialport -->
<!-- On win machine, allow an app through windows firewall.  Check node.js boxes -->

<!-- start server -->
<!-- node numato_webserver.js -->

User interfact HTML file must be in public/index.html

<!-- Open web page -->
<!-- http://localhost:8080/ -->
<!-- http://192.168.1.15:8080/ -->

*/



node interface to numato board
https://numato.com/kb/usb-gpio-modules-node-js/

web socket information
https://www.w3schools.com/nodejs/nodejs_raspberrypi_webserver_websocket.asp

