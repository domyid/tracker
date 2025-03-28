import { getCookie, setCookieWithExpireHour } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.6/cookie.js";

const postBiasa = async (target_url, datajson, responseFunction) => {
    try {
        const myHeaders = new Headers({
            "Content-Type": "application/json"
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(datajson),
            redirect: 'follow'
        };

        const response = await fetch(target_url, requestOptions);
        const status = response.status;
        const result = await response.json();

        responseFunction({ status, data: result });
    } catch (error) {
        console.error('Error:', error);
    }
};

const responseFunction = ({ status }) => {
    console.log(status === 200 ? "Berhasil" : "Error");
};

function getMetaAuthor() {
    const metaTag = document.querySelector('meta[name="author"]');
    return metaTag ? metaTag.content : 'Meta author tidak ditemukan';
}

const getSystemInfo = async () => {
    document.addEventListener("DOMContentLoaded", async () => {
        if (getCookie("absen")) {
            console.log("Data sudah dikirim dalam 24 jam terakhir, tidak mengirim ulang.");
            return;
        }
        try {
            const response = await fetch("https://api.ipify.org?format=json");
            const { ip } = await response.json();
            let hostnameWeb = window.location.hostname;
            const urlHref = window.location.href;
            let datajson

            if (hostnameWeb === "t.if.co.id") {
                const pathname = window.location.pathname;
                hostnameWeb = `${hostnameWeb}${pathname}`;
                datajson = {
                    ipv4: ip,
                    author: getMetaAuthor(),
                    hostname: hostnameWeb,
                    url: urlHref,
                    browser: navigator.userAgent
                };
                await postBiasa("https://asia-southeast2-awangga.cloudfunctions.net/domyid/api/tracker", datajson, responseFunction);
            } else {
                datajson = {
                    ipv4: ip,
                    author: getMetaAuthor(),
                    hostname: hostnameWeb,
                    url: urlHref,
                    browser: navigator.userAgent
                };
                await postBiasa("https://asia-southeast2-awangga.cloudfunctions.net/domyid/api/tracker", datajson, responseFunction);
                setCookieWithExpireHour("absen", "true", 24);
            }
        } catch (error) {
            console.error("Error mengambil IP dari ipify:", error);
        }
    });
};

getSystemInfo();