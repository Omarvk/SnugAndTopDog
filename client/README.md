install þessu fyrir client
bower install angular --save
bower install angular-animate --save
bower install angular-route --save-dev
bower install angular-bootstrap --save
bower install jquery 

fyrir client server
npm install gulp --save
npm install gulp-webserve --save-dev 

fyrir concat
npm install gulp-uglify --save-dev 
npm install gulp-concat --save-dev 

fyrir jshint
npm install grunt --save
npm install grunt-contrib-jshint --save-dev

--------------------------------------------------------
Server
server var ekki snertur
--------------------------------------------------------
hlutir sem voru ekki útfærðir 

diconnect var ekki krafa gerð til og það þurfti að breyta server til að útfæra það sem diconnect er ban orð í socket
op
deop
setpassword
removepassword
settopic
unban.

--------------------------------------------------------
Starta
keyri skipuna gulp í client folderiunm sem keyri þá client serverinn
Og hefur auðvita kveikt á server(chatserver.js).
--------------------------------------------------------
Virkni

loggar inn þar sem fyrsta síðan er login. þar ættiru að sá roomlist
sem þú annahvort velur room á listanum eða velur að búa til nýtt room.

í room geturu skrifað skilaboð með að smella á enter eftir þú hefur skrifa það í input gluggann
eða sendir einkaskilaboð á user innas þess rooms með að smella á hann í user lista og skrifa skilaboða í sama input glugga sem er notaður fyrir roomchattið og íttir svo á whipsers. Svo getur user farið úr roomið með því að ítta á leava takkann. Sem Creater á herbergi verðu sá notandi Op sem er þá sýndur á userlista með @merki fyrir framan nafn sá notandi fær að sá möguleikann á að kicka og banna user sem hann velur á user lista.

Skilaboð frá herbergi(þess hver hefur joina, partað eða annað) eru sýnd með grænum lit en einkaskilaboð með bleikum.

--------------------------------------------------------
concat
keyri gulp js í client folder.
concat fileinn(build/app.js) virðist ekki virka þar sem hann þjabbaði öllum parameters names í einn character og fatta þá ekki lengur hvaða parameter er hver.
--------------------------------------------------------
jshint
keyri grunt í client folder.

