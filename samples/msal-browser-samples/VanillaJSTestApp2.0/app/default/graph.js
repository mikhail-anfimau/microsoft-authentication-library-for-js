// Helper function to call MS Graph API endpoint 
// using authorization bearer token scheme
function callMSGraph(endpoint, accessToken, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => console.log(error));
}

async function seeProfile() {
    const currentAcc = myMSALObj.getAccountByHomeId(accountId);
    if (currentAcc) {
        const response = await getTokenPopup(loginRequest, currentAcc).catch(error => {
            console.log(error);
        });
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        profileButton.style.display = 'none';
    }
}

async function readMail() {
    const currentAcc = myMSALObj.getAccountByHomeId(accountId);
    if (currentAcc) {
        const response = await getTokenPopup(tokenRequest, currentAcc).catch(error => {
            console.log(error);
        });
        callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        mailButton.style.display = 'none';
    }
}

async function seeProfileRedirect() {
    const currentAcc = myMSALObj.getAccountByHomeId(accountId);
    if (currentAcc) {
        const response = await getTokenRedirect(loginRequest, currentAcc).catch(error => {
            console.log(error);
        });
        callMSGraph(graphConfig.graphMeEndpoint, response.accessToken, updateUI);
        profileButton.style.display = 'none';
    }
}

async function readMailRedirect() {
    const currentAcc = myMSALObj.getAccountByHomeId(accountId);
    if (currentAcc) {
        const response = await getTokenRedirect(tokenRequest, currentAcc).catch(error => {
            console.log(error);
        });
        callMSGraph(graphConfig.graphMailEndpoint, response.accessToken, updateUI);
        mailButton.style.display = 'none';
    }
}



function callAzureManagement(endpoint, accessToken, callback) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    console.log('request made to Graph API at: ' + new Date().toString());

    fetch(endpoint, options)
        .then(response => response.json())
        .then(response => callback(response, endpoint))
        .catch(error => console.log(error));
}

const azureManagementTokenRequest = {
    scopes: ["https://management.azure.com/user_impersonation"],
    forceRefresh: false // Set this to "true" to skip a cached token and go to the server to get a new token
};

async function listVMs() {
    const currentAcc = myMSALObj.getAccountByHomeId(accountId);
    if (currentAcc) {
        const response = await getTokenRedirect(azureManagementTokenRequest, currentAcc).catch(error => {
            console.log(error);
        });
        callAzureManagement("https://management.azure.com/subscriptions/7f145f7d-eeec-4327-a272-aad732d20f80/providers/Microsoft.Compute/virtualMachines?api-version=2021-07-01", response.accessToken, updateUI);
        mailButton.style.display = 'none';
    }
}
