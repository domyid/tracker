import { getCookie, setCookieWithExpireHour } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.6/cookie.js";
import { postJSON } from "https://cdn.jsdelivr.net/gh/jscroot/lib@0.2.6/api.js";

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

        responseFunction({ status, data: result, originalData: datajson });
    } catch (error) {
        console.error('Error:', error);
    }
};

const getSystemInfo = async () => {
    document.addEventListener("DOMContentLoaded", async () => {
        if (getCookie("Tracker")) {
            console.log("Data sudah dikirim dalam 24 jam terakhir, tidak mengirim ulang.");
            return;
        }

        try {
            const ipapiRes = await fetch("https://ipapi.co/json/");
            const ipapiData = await ipapiRes.json();

            const hostnameWeb = window.location.hostname;
            const urlHref = window.location.href;
            const screenResolution = `${screen.width}x${screen.height}`;
            const ontouchstart = 'ontouchstart' in window;

            const datajson = {
                hostname: hostnameWeb === "t.if.co.id" ? hostnameWeb + window.location.pathname : hostnameWeb,
                url: urlHref,
                browser: navigator.userAgent,
                browser_language: navigator.language || navigator.userLanguage,
                screen_resolution: screenResolution,
                timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                ontouchstart: ontouchstart,
                tanggal_ambil: new Date().toISOString(),
                isp: {
                    ip: ipapiData.ip,
                    city: ipapiData.city,
                    region: ipapiData.region,
                    country_name: ipapiData.country_name,
                    postal: ipapiData.postal,
                    latitude: ipapiData.latitude,
                    longitude: ipapiData.longitude,
                    timezone: ipapiData.timezone,
                    asn: ipapiData.asn,
                    org: ipapiData.org
                }
            };

            await postBiasa("https://asia-southeast2-awangga.cloudfunctions.net/domyid/api/tracker/token", datajson, responseFunction);

        } catch (error) {
            console.error("Gagal mengambil data dari ipapi.co:", error);
        }
    });
};

function responseFunction(result) {
    if (result.status == 200) {
        setCookieWithExpireHour("Tracker", result.data.response, 24);

        const trackerToken = getCookie("Tracker");
        if (trackerToken) {
            postJSON(
                "https://asia-southeast2-awangga.cloudfunctions.net/domyid/api/tracker",
                result.originalData,
                responseFunction2,
                "Tracker",
                trackerToken
            );
        }
    }
}

function responseFunction2(result) {
    if (result.status == 200) {
        console.log("Berhasil");
    } else {
        console.log("Gagal mengirim data");
    }
}

getSystemInfo();
