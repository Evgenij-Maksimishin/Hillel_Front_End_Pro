class Router {
	constructor(routes, root) {
		this.routes = routes;
		this.root = root;
		this.init();
	}

	init() {
		window.onpopstate = () => {
			this.onRouteChange();
		}
		this.onRouteChange();
	}

	onRouteChange() {
		const route = this.getRouteFromPath(window.location.href);
		this.navigate(route);
	}

	navigate(route = {path: '/', params: {}}) {
		const { path, params } = route;
		let content = this.routes[path];
        this.root.innerHTML = content(params);
	}

	redirect(pathname) {
		window.location.href = window.location.pathname + '#' + pathname;
	}

	parsePathName(url) {
		let route = {};
		if (this.routes[url]) {
			return new Route(url);
		}
		else {
			const urlParams = url.split('-');

			if (urlParams.length < 2) return new Route();

			const routes = Object.keys(this.routes);
			
			for(let i = 0; i < routes.length; ++i) {
				const key = routes[i];
				const regexp = /{([0-9a-z])*}/g;
				const match = key.replace(regexp, urlParams[1]);
				if (url === match) {
					return new Route(key, {id: urlParams[1]});
				}
			}
		}
		return new Route();
	}

	getRouteFromPath(url) {
		const match = url.match(/#(.*)$/);
		const path = match ? match[1] : '/';
		const route = this.parsePathName(path);
		return route;
	}
}	

class Route {
	constructor(path = "/", params = null) {
		this.path = path;
		this.params = params;
	}
}