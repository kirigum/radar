export const normalizeOption = (cities, regions) => Object.values(regions)
	.map(region => ({
		value: region.id,
		label: region.name,
		children: region.children.map(cityId => {
			const city = cities[cityId];

			return { value: cityId, label: city.name };
		}),
	}));

export const getInfoAboutWatchedCity = (cities, regions, watchedIds) => {
	if (!watchedIds) {
		return;
	}

	if (watchedIds.length === 1) {
		const [cityId] = watchedIds;

		return `м. ${regions[cityId].name}`;
	}

	const [regionId, cityId] = watchedIds;

	return `${regions[regionId].name} - м. ${cities[cityId].name}`;
}

export const fetchWithTimeout = async (resource, options = {}) => {
	const { timeout = 10000 } = options;

	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeout);
	const response = await fetch(resource, {
		...options,
		signal: controller.signal
	});

	clearTimeout(id);

	return response;
}