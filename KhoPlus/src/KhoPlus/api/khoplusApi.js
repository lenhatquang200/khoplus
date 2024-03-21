import Config from '../config'

async function GetAuthInfo(param){
    let inforUser = {
        "phone":'0909000111',
        "password":"admin"
    }
    let response = await fetch(
        `https://api.khoplus.com/api/auth/login`,
        {
            method:"POST",
            body: JSON.stringify(inforUser),
            credentials: 'omit',
            headers: {
               "Content-Type": "application/json",
              },
        }
    )
    return response.json()
}

export default {
    GetAuthInfo
}