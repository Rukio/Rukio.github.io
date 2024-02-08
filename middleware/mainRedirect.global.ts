export default defineNuxtRouteMiddleware((to) => {
	console.log(to);
	if (to.path === "/") {
		return navigateTo("/login");
	}
});