Installa skal þetta fyrir client:
bower install angular --save
bower install angular-animate --save
bower install angular-route --save-dev
bower install angular-bootstrap --save
bower install jquery 

Fyrir client server:
npm install gulp --save
npm install gulp-webserve --save-dev 

Fyrir concat:
npm install gulp-uglify --save-dev 
npm install gulp-concat --save-dev 

Fyrir jshint:
npm install grunt --save
npm install grunt-contrib-jshint --save-dev

--------------------------------------------------------
Server
Server var ekki snertur
--------------------------------------------------------
Hlutir sem voru ekki útfærðir:

disconnect, ekki var gerð krafa um það og það þyrfti að breyta server til að útfæra það, þar sem disconnect er ban orð í socket.
op
deop
setpassword
removepassword
settopic
unban

--------------------------------------------------------
Til að starta:
Með serverinn (chatserver.js) í gangi og keyrið skipunina "gulp" í client folderinum, sem keyrir þá client serverinn.
--------------------------------------------------------
Virkni

Upphafssíðan er innskráningarsíða, þar sem notendanafn er slegið inn.
Næsta skjámynd er listi yfir opin herbergi, einnig er þar hnappur til að búa til nýtt herbergi.

Þegar inn í herbergi er komið er hægt að spjalla með því að skrifa skilaboð og smella á "Enter".
Til að senda einkaskilaboð á annan notanda eru skilaboðin skrifuð eins og venjulega,
nema í stað fyrir að smella á "Enter" er smellt á nafn hans og svo smellt á "Whisper".
Hægt er að fara út úr herberginu með því að smella á "Leave" hnappinn.
Þegar herbergi er búið til verður sá sem bjó það til sjálfkrafa "op" á því herbergi, sýnt með "@" merki fyrir framan nafn hans.
Sá notandi "op" sér hann tvo takka til viðbótar, "Kick" og "Ban", til að fjarlægja aðra notendur úr herberginu og koma í veg fyrir að þeir snúi aftur.

Sjálfvirk skilaboð í herbergi (t.d. notandi bætist við eða fer) eru sýnd með grænum lit meðan einkaskilaboð eru sýnd með bleikum lit.

--------------------------------------------------------
Concat:
Keyra gulp js í client folder.
--------------------------------------------------------
jshint:
Keyra grunt í client folder.

