function postBiasa(target_url,datajson,responseFunction){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(datajson);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(target_url, requestOptions)
        .then(response => {
            const status = response.status;
            return response.text().then(result => {
                const parsedResult = JSON.parse(result);
                responseFunction({ status, data: parsedResult });
            });
        })
        .catch(error => console.log('error', error));
}


export function getSystemInfo() {
    fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        let ip = data.ip;
        let hostname = window.location.hostname;

        let datajson = {
            "ipv4": ip,
            "hostname": hostname,
            "browser": navigator.userAgent
        }
        postBiasa("https://asia-southeast2-awangga.cloudfunctions.net/domyid/api/tracker", datajson, responseFunction)
    })
    .catch(error => {
        console.error("Error mengambil ip dari ipify:", error);
    });
}

function responseFunction(result) {
    if (result.status == 200) {
        console.log("Berhasil")
    } else {
        console.log("Error")
    }
}
