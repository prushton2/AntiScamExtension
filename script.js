async function init() {
    let sites = (await browser.storage.sync.get("trustedSites"))["trustedSites"]
    try {
        sites.push("test");
    } catch (e) {
        await browser.storage.sync.set({"trustedSites": []})
    }
}

async function popup() {
    if(
        confirm("This page isnt in your trusted pages list.")) {
        return true
    }
    return false
}

async function main() { 
    await init()

    let sites = (await browser.storage.sync.get("trustedSites"))["trustedSites"]
    let domain = window.location.hostname.split(".").slice("-2").join(".")
    
    if(sites.indexOf(domain) === -1) {
        if(confirm("This page isnt in your trusted pages list.")) {
            sites.push(domain)
            await browser.storage.sync.set({"trustedSites": sites});
        }
    }
}


main()