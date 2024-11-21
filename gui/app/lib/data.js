export async function fetchAutoComplete(query) {
  const searchParams = new URLSearchParams({
    query: query,
  }).toString();
  let res = await fetch(process.env.NEXT_PUBLIC_LOCATION + "?" + searchParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function fetchGeocoding(id) {
  let res = await fetch(process.env.NEXT_PUBLIC_LOCATION + "/" + id, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
}

export async function unwatchShow(show) {
  await checkToken();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/shows/unwatched/" + show.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function lockShow(show) {
  await checkToken();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/shows/lock/" + show.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function unlockShow(show) {
  await checkToken();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/shows/unlock/" + show.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function updateShowsLocks(list) {
  await checkToken();
  let res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/shows/locks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("idToken"),
    },
    body: JSON.stringify(list),
  });
  checkStatus(res);
}

export async function updateShowsPositions(list) {
  await checkToken();
  let res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/shows/positions", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("idToken"),
    },
    body: JSON.stringify(list),
  });
  checkStatus(res);
  return await res.json();
}

export async function deleteShow(show) {
  await checkToken();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/shows/" + show.id,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
}

export async function fetchAllShows() {
  await checkToken();
  let res = await fetch(process.env.NEXT_PUBLIC_HOST + "/api/shows", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("idToken"),
    },
  });
  checkStatus(res);
  return await res.json();
}

export async function fetchShows(type) {
  await checkToken();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/shows/type/" + type,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function fetchWatched(type) {
  await checkToken();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/shows/watched/" + type,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function fetchSearch(title, type) {
  await checkToken();
  const searchParams = new URLSearchParams({
    title: title,
    type: type,
  }).toString();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/search?" + searchParams,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function fetchDetails(show) {
  await checkToken();
  const searchParams = new URLSearchParams({
    type: show.showType,
  }).toString();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST +
      "/api/search/" +
      show.id +
      "?" +
      searchParams,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function fetchSearchCollection(id) {
  await checkToken();
  let res = await fetch(
    process.env.NEXT_PUBLIC_HOST + "/api/search/collection/" + id,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("idToken"),
      },
    }
  );
  checkStatus(res);
  return await res.json();
}

export async function exchangeCodeForToken() {
  console.log("Enter callback");
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");

  if (code) {
    const tokenUrl = `${process.env.NEXT_PUBLIC_HOSTED_UI_DOMAIN}/oauth2/token`;

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      code: code,
      redirect_uri: process.env.NEXT_PUBLIC_CALLBACK,
    });
    console.log("Exchange code for token");
    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body.toString(),
    });
    console.log("Waiting for the token");
    const data = await response.json();
    if (data.id_token) {
      console.log("Got the token");
      localStorage.setItem("idToken", data.id_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      return true;
    } else {
      console.error("Błąd przy wymianie kodu na token:", data);
      return false;
    }
  }
  return false;
}

export function logout() {
  localStorage.removeItem("idToken");
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const domain = process.env.NEXT_PUBLIC_HOSTED_UI_DOMAIN;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_CALLBACK);
  const hostedUiUrl = `${domain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;
  const logoutUrl = `${domain}/logout?client_id=${clientId}&logout_uri=${hostedUiUrl}`;
  window.location.href = logoutUrl;
}

async function checkToken() {
  const idToken = localStorage.getItem("idToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (!idToken || isTokenExpired(idToken)) {
    if (refreshToken) {
      try {
        await refreshTokens(refreshToken);
      } catch (error) {
        console.error(
          "Odświeżenie tokena nie powiodło się, przekierowanie do logowania"
        );
        redirectToLogin();
      }
    } else {
      redirectToLogin();
    }
  }
}

export function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
}

function isTokenExpired(token) {
  if (!token) return true;
  const decodedToken = parseJwt(token);
  if (!decodedToken || !decodedToken.exp) return true;
  const currentTime = Math.floor(Date.now() / 1000);
  return decodedToken.exp < currentTime;
}

async function refreshTokens(refreshToken) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const domain = process.env.NEXT_PUBLIC_HOSTED_UI_DOMAIN;

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: refreshToken,
  });

  const response = await fetch(`${domain}/oauth2/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (response.ok) {
    const data = await response.json();
    localStorage.setItem("idToken", data.id_token);
    return data;
  } else {
    throw new Error("Refresh token failed");
  }
}

function redirectToLogin() {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const domain = process.env.NEXT_PUBLIC_HOSTED_UI_DOMAIN;
  const redirectUri = encodeURIComponent(process.env.NEXT_PUBLIC_CALLBACK);
  const hostedUiUrl = `${domain}/login?client_id=${clientId}&response_type=code&scope=openid+email+profile&redirect_uri=${redirectUri}`;
  window.location.href = hostedUiUrl;
}

function checkStatus(response) {
  if (response.status === 401) {
    redirectToLogin();
  }
}
