let apiUrl;
const apiUrls = {
  production: "https://gig-app-api.herokuapp.com",
  development: "http://localhost:3000",
};

if (window.location.hostname === "localhost") {
  apiUrl = apiUrls.development;
} else {
  apiUrl = apiUrls.production;
}

export default apiUrl;
