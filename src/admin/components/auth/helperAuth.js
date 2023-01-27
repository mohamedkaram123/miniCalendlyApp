import axios from "axios";
import { gapi } from "gapi-script";
 
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
const SCOPES = "https://www.googleapis.com/auth/calendar";


export function initClient(callback) {
    gapi.load('client:auth2',()=>{
        try {
            gapi.client.init({
                apiKey: process.env.REACT_APP_API_KEY,
                clientId: process.env.REACT_APP_CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES,

            }).then(function (res) {
             
                callback(true)


            }, function(error) {
                console.log({error});
            });
        } catch (error) {
            console.log({error});

        }
    });
};

export const checkSignInStatus =async () =>{
    try {
        let status = await gapi.auth2.getAuthInstance().isSignedIn.get();
        return status;
    } catch (error) {
        console.log(error);
    }
}


export const signInToGoogle =(callback)=>{

    return gapi.auth2.getAuthInstance().signIn().then(function (resp) {
        updateSigninStatus(callback);
    });
}

function updateSigninStatus(callback) {

    gapi.auth2.getAuthInstance().currentUser.get().grantOfflineAccess({ 'scope': SCOPES }).then(function (auth) {
        if (auth && auth.code) {
            
            let tokenRequest =  axios.request({
                method: 'post',
                url: "https://www.googleapis.com/oauth2/v4/token",
                headers: {"content-type": "application/x-www-form-urlencoded"},
                params: {
                  code: auth.code,
                  client_id: process.env.REACT_APP_CLIENT_ID,
                  client_secret: process.env.REACT_APP_SECRET_ID,
                  redirect_uri: window.location.origin,
                  grant_type: "authorization_code"
                }
             }).then((res)=>{
                callback(res.data)
             });
            
          
        }
    });
}


export const signOutFromGoogle = () => {
    try {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            auth2.disconnect();
        });
        return true;
    } catch (error) {
        console.log(error)
    }
}

export const getSignedInUserEmail = async () => {
    try {
        let status = await checkSignInStatus();
        if (status){
            var auth2 = gapi.auth2.getAuthInstance();
            var profile = auth2.currentUser.get().getBasicProfile();
            return profile.getEmail()
        } else {
            return null;
        }
    } catch (error) {
        console.log(error)
    }
}