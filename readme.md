ionic start lodgistics_assignment

npm i ionic --save-dev

npm i @ionic/lab --save-dev

npm i @ngrx/store @ngrx/router-store @ngrx/effects --save

npm i @ngrx/store-devtools --save-dev

ionic cordova plugin add cordova-sqlite-storage

npm i @ionic/storage --save

ionic cordova plugin add cordova-plugin-camera

npm i @ionic-native/camera --save

ionic cordova plugin add cordova-plugin-crop

npm i @ionic-native/crop

ionic cordova plugin add cordova-plugin-file

npm i @ionic-native/file --save

ionic cordova plugin add cordova-plugin-filepath

npm i @ionic-native/file-path --save









ionic cordova build android --prod --release

ionic cordova run android --prod --release

npm i -g lighthouse

//lighthouse URL-TO-TEST --view
lighthouse http://localhost:8100 --view

npm i -g http-server
or
npm i -g angular-http-server

ionic build --prod

//http-server FOLDER-PATH -p PORT
http-server ./www -p 8888
or
angular-http-server --path ./www --open

angular-http-server --path ./www --open --https
