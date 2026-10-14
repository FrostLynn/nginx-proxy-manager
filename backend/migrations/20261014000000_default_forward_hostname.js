import { migrate as logger } from "../logger.js";

const migrateName = "default_forward_hostname";

/**
 * Migrate
 *
 * @see http://knexjs.org/#Schema
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
const up = (knex) => {
	logger.info(`[${migrateName}] Migrating Up...`);

	return knex("setting")
		.where({ id: "default-forward-hostname" })
		.first()
		.then((row) => {
			if (!row) {
				return knex("setting").insert({
					id: "default-forward-hostname",
					name: "Default Forward Hostname",
					description: "Default hostname pre-filled when creating a new Proxy Host",
					value: "",
					meta: JSON.stringify({}),
				});
			}
		})
		.then(() => {
			logger.info(`[${migrateName}] default-forward-hostname setting added`);
		});
};

/**
 * Undo Migrate
 *
 * @param   {Object} knex
 * @returns {Promise}
 */
const down = (knex) => {
	logger.info(`[${migrateName}] Migrating Down...`);

	return knex("setting").where({ id: "default-forward-hostname" }).delete().then(() => {
		logger.info(`[${migrateName}] default-forward-hostname setting removed`);
	});
};

export { up, down };
